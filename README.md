# Anatomon Trainers #
Developed with Remix
Live App - https://anatomon-training.dgeddadevelops.me
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



