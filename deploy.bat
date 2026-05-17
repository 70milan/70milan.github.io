@echo off
git checkout master
git add .
git commit -m "Deploy: Visual Overhaul"
git push origin master
echo DONE > deploy_status.txt
