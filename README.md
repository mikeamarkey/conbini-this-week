# 🏪 conbini-this-week

---

See what's coming up this week at the conbini (Japanese convenience stores)

### Prerequisites

- [supabase account](https://supabase.com/) for hosting the database
  - add the necessary tables as laid out in `supabase/src/generate/api.ts`
  - hoping to automate this step ☝️ in the future

### Installing

- clone the repository
- add the necessary `.env` files
  - see the `.env.template` files in each package

### Packages

- `scraper`: a playwright scraper for gathering conbini item details
- `supabase`: db tools through supabase's postgresql api
- `web`: a nextjs webapp for displaying upcoming items

### Acknowledgments

A lot of inspiration was taken for the project structure from https://github.com/belgattitude. Highly recommended for ideas on organizing nextjs monorepo projects!
