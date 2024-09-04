# Subdomain DNS Recon

`subdomain-dns-recon` is a tool that automates the process of finding subdomains for a specified domain and fetching DNS records for each subdomain. It uses `subfinder` to discover subdomains and the `@layered/dns-records` library in Node.js to fetch and save DNS records.

## Features

- Automatically installs `subfinder` using Go.
- Finds subdomains for a specified domain.
- Fetches all DNS records for each discovered subdomain.
- Organizes subdomains based on the presence of DNS records:
  - Subdomains with DNS records are saved in the `dns/records` directory.
  - Subdomains without DNS records are saved in the `dns/empty` directory.
- Generates two text files:
  - `{domain}_empty_list.txt`: List of subdomains with no DNS records.
  - `{domain}_records_list.txt`: List of subdomains with DNS records.

## Setup

### Prerequisites

1. **Go**: Ensure Go is installed on your system. [Install Go](https://golang.org/doc/install).
2. **Node.js and npm**: Ensure Node.js and npm are installed. [Install Node.js](https://nodejs.org/).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jacksonkasi1/subdomain-dns-recon.git
   cd subdomain-dns-recon
   ```

2. **Run the setup script**:

   This script will install `subfinder` using Go, find subdomains for the specified domain, and fetch DNS records.

   ```bash
   chmod +x setup_and_run.sh
   ./setup_and_run.sh
   ```

   The script will:
   - Install `subfinder` using Go.
   - Find subdomains for the specified domain.
   - Fetch and save DNS records for each subdomain.

## Usage

1. **Edit the `setup_and_run.sh` script** to specify the target domain:

   Open `setup_and_run.sh` and modify the `DOMAIN` variable to your target domain:

   ```bash
   DOMAIN="yourtargetdomain.com"
   ```

2. **Run the setup script**:

   ```bash
   ./setup_and_run.sh
   ```

   This will execute the full pipeline:
   - Subfinder will search for subdomains of `yourtargetdomain.com`.
   - The Node.js script will fetch DNS records for each subdomain found by Subfinder.
   - DNS records will be organized into `dns/records` and `dns/empty` directories.

3. **Check the results**:

   - Subdomains with DNS records are saved in the `dns/records` directory.
   - Subdomains without DNS records are saved in the `dns/empty` directory.
   - Two text files are generated:
     - `{domain}_empty_list.txt`: List of subdomains with no DNS records.
     - `{domain}_records_list.txt`: List of subdomains with DNS records.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
