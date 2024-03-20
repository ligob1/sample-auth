# Running Playwright Tests in Docker and Locally

This repository contains instructions on how to set up and run Playwright tests both within a Docker container and locally on your machine. Playwright is a Node.js library for automating browsers, and running tests in Docker ensures consistency across different environments, while running tests locally allows for quick iterations and debugging.

## Prerequisites

- Docker installed on your system. You can download and install Docker from [here](https://www.docker.com/get-started).
- Node.js installed on your system. You can download and install Node.js from [here](https://nodejs.org/).

## Setup Instructions

1. **Navigate to the Provided Repository Directory:**

cd <provided-repository-directory>

2. **Install Dependencies:**

npm install

3. **Build Docker Image:**

docker build -t playwright-tests 

## Running Tests in Docker

Once you have set up the environment, you can run the tests inside a Docker container.

### Command:

docker run --rm playwright-tests

This command will execute all the Playwright tests within the Docker container.

## Running Tests Locally

You can also run the tests directly on your local machine.

### Command:

npx playwright test


This command will execute all the Playwright tests locally using the installed Node.js environment.

## Running Tests on CI with Latest Docker Image

You can run the tests on your CI (Continuous Integration) pipeline using the latest Docker image.

### Example CI Configuration (e.g., GitHub Actions)

name: Run Playwright Tests

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v2
      
    - name: Build Docker image
      run: docker build -t playwright-tests .

    - name: Run tests
      run: docker run --rm playwright-tests

This configuration assumes you're using GitHub Actions. Adjustments may be needed for other CI systems.

## Additional Notes

- **Environment Configuration**: Environment configuration files are placed in the `/env` directory. Make sure to update these files as necessary for your specific environment.
- **Parallel Execution**: By default, tests are configured to run in parallel. Playwright supports parallel execution, which can significantly reduce test execution time.
- **Playwright Documentation**: Options on how to run tests with Playwright can be found in the [official documentation](https://playwright.dev/docs/running-tests).
- **Test Scripts**: Playwright test scripts should be placed within the `/tests` directory. The Docker image will use these scripts for execution.
- **Dockerfile**: The Dockerfile provided in the repository specifies the configuration for the Docker image. You can customize it according to your requirements.
- **Playwright Configuration**: Ensure that your Playwright tests are configured properly to run in headless mode or with a specific browser instance. Adjust configurations as needed in your test scripts.

## Support

If you encounter any issues or have questions regarding running Playwright tests in Docker, locally, or on CI, please feel free to open an issue in this repository. We'll be happy to assist you!

Happy Testing! 🚀