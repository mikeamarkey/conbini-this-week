# 🏪 conbini-this-week

---

See what's coming up this week at the conbini (Japanese convenience stores)

### Prerequisites

- [supabase account](https://supabase.com/) for hosting the database
  - add the necessary tables as laid out in `db/schema.ts`

### Installing

- clone the repository
- add the necessary `.env` files
  - see the `.env.template` files in each package

### Packages

- `core`: general constants and types related to conbinis
- `db`: db tools through supabase's postgresql api
- `scraper`: a scraper for gathering conbini item details

### Apps

- `web`: a nextjs webapp for displaying upcoming items

### Acknowledgments

A lot of inspiration was taken for the project structure from https://github.com/belgattitude. Highly recommended for ideas on organizing nextjs monorepo projects!
