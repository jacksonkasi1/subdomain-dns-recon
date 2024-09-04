#!/bin/bash

# Install Go if it's not already installed (specific to Unix systems)
if ! command -v go &> /dev/null
then
    echo "Go could not be found, please install it first."
    exit
fi

# Install Subfinder using Go
echo "Installing Subfinder..."
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest

# Ensure Go's bin directory is in your PATH
export PATH=$PATH:$(go env GOPATH)/bin

# Define the domain to search subdomains for
DOMAIN="microsoft.com"
OUTPUT_FILE="${DOMAIN}_subdomains.txt"
DNS_RECORDS_DIR="dns"

# Run Subfinder to find subdomains
echo "Running Subfinder for domain: $DOMAIN..."
subfinder -d $DOMAIN -o $OUTPUT_FILE

# Ensure the DNS records directory exists
mkdir -p $DNS_RECORDS_DIR

# Install necessary Node.js packages and run the Node.js script
# echo "Setting up Node.js project..."
# pnpm init -y
# pnpm install @layered/dns-records

# Run the Node.js script to fetch DNS records
echo "Fetching DNS records for each subdomain..."
node fetch_dns_records.js $OUTPUT_FILE $DNS_RECORDS_DIR
