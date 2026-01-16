pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir('frontend') {
                    // sh 'npm test' // Uncomment when tests are added
                    echo 'Skipping frontend tests for now'
                }
            }
        }

        stage('Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to AWS EC2...'
                // sh 'scp -r backend/ user@ec2-ip:/var/www/app'
                // sh 'scp -r frontend/dist/ user@ec2-ip:/var/www/app/public'
            }
        }
    }
}
