#!/bin/bash

# Simple script to preview the static build locally

echo "Building static site..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Build successful!"
    echo ""
    echo "Starting local server..."
    echo "Open: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop"
    cd out && python3 -m http.server 8000
else
    echo "✗ Build failed. Check errors above."
    exit 1
fi
