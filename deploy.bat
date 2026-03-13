@echo off
git checkout main
git add .
git commit -m "Deploy: Visual Overhaul"
git push origin main
echo DONE > deploy_status.txt
