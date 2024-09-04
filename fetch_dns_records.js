// Import necessary modules
import { getAllDnsRecords } from '@layered/dns-records';
import fs from 'fs/promises';
import { readFileSync } from 'fs';

// Function to fetch DNS records and save them to files based on whether records exist
async function fetchAndSaveDnsRecords(domain, outputDir) {
  try {
    // Fetch DNS records for the domain
    const allRecords = await getAllDnsRecords(domain, {
      resolver: 'cloudflare-dns',
      commonSubdomainsCheck: true,
    });

    // Convert records to a string format
    const recordsString = JSON.stringify(allRecords, null, 2);
    
    if (allRecords.length > 0) {
      // If DNS records exist, save them to the 'dns/records' directory
      const filename = `${outputDir}/records/${domain}_dns_records.json`;
      await fs.writeFile(filename, recordsString, 'utf8');
      console.log(`DNS records for ${domain} have been saved to ${filename}`);
      return true; // Indicate records were found
    } else {
      // If no DNS records exist, save a file in the 'dns/empty' directory
      const filename = `${outputDir}/empty/${domain}_dns_records.json`;
      await fs.writeFile(filename, recordsString, 'utf8');
      console.log(`No DNS records found for ${domain}, saved to ${filename}`);
      return false; // Indicate no records were found
    }
  } catch (error) {
    console.error(`Error fetching DNS records for ${domain}:`, error);
    return false;
  }
}

// Main function to read subdomains from a file and fetch DNS records
async function main(subdomainsFile, outputDir) {
  try {
    // Read subdomains from file
    const subdomains = readFileSync(subdomainsFile, 'utf-8').split('\n').filter(Boolean);
    
    // Create necessary directories
    await fs.mkdir(`${outputDir}/records`, { recursive: true });
    await fs.mkdir(`${outputDir}/empty`, { recursive: true });

    // Initialize lists for subdomains with and without records
    const domainsWithRecords = [];
    const domainsWithoutRecords = [];

    for (const subdomain of subdomains) {
      const hasRecords = await fetchAndSaveDnsRecords(subdomain, outputDir);
      if (hasRecords) {
        domainsWithRecords.push(subdomain);
      } else {
        domainsWithoutRecords.push(subdomain);
      }
    }

    // Save lists of subdomains to text files
    const domain = subdomainsFile.split('_')[0]; // Extract domain name from subdomains file name
    await fs.writeFile(`${domain}_empty_list.txt`, domainsWithoutRecords.join('\n'), 'utf8');
    await fs.writeFile(`${domain}_records_list.txt`, domainsWithRecords.join('\n'), 'utf8');

    console.log(`Lists of subdomains saved to ${domain}_empty_list.txt and ${domain}_records_list.txt`);

  } catch (error) {
    console.error('Error reading subdomains file or fetching DNS records:', error);
  }
}

// Read command-line arguments for subdomains file and output directory
const [,, subdomainsFile, outputDir] = process.argv;
if (!subdomainsFile || !outputDir) {
  console.error('Usage: node fetch_dns_records.js <subdomains_file> <output_directory>');
  process.exit(1);
}

main(subdomainsFile, outputDir);
