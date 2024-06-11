# Anatomon Trainers #
A study app with a youthful interface

Developed with Remix
![landing and login pages](anatomon-trainers1.png)
Populate test user and login

Click on Study Mode Toggle and Pokemon cards become Myology flash cards
![main page samples](anatomon-trainers2.png)
### Live app at https://anatomon-training.dgeddadevelops.me
## Fun Technologies & Workflows
Auth:
- Login functionality with session authentication with HTTP only cookie
- J.W.T. for authorization with Cloudflare CDN

Cloudflare:
- Coordination of K/V Cache and R2 Bucket with Worker to serve static assets from edge locations
- Caching directives in Worker and lazy loading in Remix optimize performance and minimize network requests

Image:
- Initial setup of avif and webp formats and logic for efficient image serving implemented in Worker anticipating significant cost savings as app scales

GitHub:
- Continuous Integration pipeline with linting and testing workflows setup with GitHub Actions with Continuous Deployment to Fly.io
---
---


### Sample of Network Tab
![network tab stats](network-tab.png)

#### The process of using Imagemagick to manually convert images to webp and avif formats then organizing these into separate folders on R2 Bucket with logic in Worker to serve format based on Accept Header was really fun, and felt responsible instead of opting to use image service. (Plans to link to Gist here)
## Future Features & Enhancements:
- Captcha
- Localization Workflow for Spanish & French (looking forward to this!)
- Integration of a Pomodoro Timer in Study Mode






