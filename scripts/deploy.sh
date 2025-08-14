#!/bin/bash

# Deployment script for MeetPro video conferencing app
# Supports multiple cloud platforms

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="meetpro"
DOCKER_IMAGE="meetpro:latest"
DOCKER_REGISTRY="ghcr.io"

echo -e "${GREEN}🚀 MeetPro Deployment Script${NC}"
echo "=================================="

# Function to check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Docker is running${NC}"
}

# Function to build the application
build_app() {
    echo -e "${YELLOW}📦 Building application...${NC}"
    
    # Build for production
    npm run build
    
    # Build Docker image
    docker build -t $DOCKER_IMAGE .
    
    echo -e "${GREEN}✅ Application built successfully${NC}"
}

# Function to deploy to different platforms
deploy_to_platform() {
    case $1 in
        "docker")
            echo -e "${YELLOW}🐳 Deploying with Docker Compose...${NC}"
            docker-compose down
            docker-compose up -d
            echo -e "${GREEN}✅ Deployed to Docker successfully${NC}"
            echo -e "${GREEN}🌐 Application available at: http://localhost:3000${NC}"
            ;;
        "render")
            echo -e "${YELLOW}☁️ Deploying to Render...${NC}"
            # Render deployment via Docker
            echo "Build Command: npm run build"
            echo "Start Command: docker run -p \$PORT:80 $DOCKER_IMAGE"
            echo -e "${GREEN}✅ Ready for Render deployment${NC}"
            ;;
        "railway")
            echo -e "${YELLOW}🚂 Deploying to Railway...${NC}"
            # Railway deployment
            if command -v railway &> /dev/null; then
                railway login
                railway deploy
            else
                echo -e "${YELLOW}⚠️ Railway CLI not installed. Install with: npm install -g @railway/cli${NC}"
            fi
            ;;
        "aws")
            echo -e "${YELLOW}☁️ Preparing for AWS deployment...${NC}"
            # AWS ECS deployment preparation
            echo "1. Tag image: docker tag $DOCKER_IMAGE $DOCKER_REGISTRY/$APP_NAME:latest"
            echo "2. Push to ECR: docker push $DOCKER_REGISTRY/$APP_NAME:latest"
            echo "3. Update ECS service with new image"
            echo -e "${GREEN}✅ AWS deployment instructions ready${NC}"
            ;;
        *)
            echo -e "${RED}❌ Unknown platform: $1${NC}"
            echo "Supported platforms: docker, render, railway, aws"
            exit 1
            ;;
    esac
}

# Function to run health checks
health_check() {
    echo -e "${YELLOW}🔍 Running health checks...${NC}"
    
    # Wait for application to start
    sleep 10
    
    # Check if application is responding
    if curl -f http://localhost:3000 >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Application is healthy${NC}"
    else
        echo -e "${RED}❌ Application health check failed${NC}"
        exit 1
    fi
}

# Function to show deployment info
show_info() {
    echo ""
    echo -e "${GREEN}🎉 Deployment Complete!${NC}"
    echo "=================================="
    echo -e "${GREEN}📱 Frontend:${NC} http://localhost:3000"
    echo -e "${GREEN}🗄️ Database:${NC} postgresql://localhost:5432/meetpro"
    echo -e "${GREEN}🔄 Redis:${NC} redis://localhost:6379"
    echo ""
    echo -e "${YELLOW}📋 Next Steps:${NC}"
    echo "1. Set up Supabase backend integration"
    echo "2. Configure WebRTC STUN/TURN servers"
    echo "3. Set up monitoring and logging"
    echo "4. Configure SSL certificates for production"
    echo ""
    echo -e "${GREEN}📚 Documentation:${NC} https://docs.lovable.dev"
}

# Main deployment flow
main() {
    local platform=${1:-docker}
    
    echo -e "${YELLOW}🎯 Target Platform: $platform${NC}"
    
    # Pre-deployment checks
    check_docker
    
    # Build application
    build_app
    
    # Deploy to specified platform
    deploy_to_platform $platform
    
    # Run health checks for local deployment
    if [ "$platform" = "docker" ]; then
        health_check
    fi
    
    # Show deployment information
    show_info
}

# Help function
show_help() {
    echo "MeetPro Deployment Script"
    echo ""
    echo "Usage: $0 [PLATFORM]"
    echo ""
    echo "Platforms:"
    echo "  docker   - Deploy locally with Docker Compose (default)"
    echo "  render   - Prepare for Render deployment"
    echo "  railway  - Deploy to Railway"
    echo "  aws      - Prepare for AWS ECS deployment"
    echo ""
    echo "Examples:"
    echo "  $0                # Deploy locally with Docker"
    echo "  $0 docker         # Deploy locally with Docker"
    echo "  $0 render         # Prepare for Render"
    echo "  $0 railway        # Deploy to Railway"
    echo "  $0 aws            # Prepare for AWS"
}

# Check for help flag
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    show_help
    exit 0
fi

# Run main deployment
main $1