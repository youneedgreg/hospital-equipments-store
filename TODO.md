# Buyer Dashboard Real-Time Integration

## Tasks
- [ ] Create functions to fetch buyer dashboard data from Supabase
- [ ] Update buyer dashboard page to use real-time data
- [ ] Implement real-time subscriptions for live updates
- [ ] Test the integration

## Details
- Fetch recent orders from `orders` table filtered by buyer_id
- Calculate stats (total orders, in-progress, in-transit, delivered) from database
- Use Supabase real-time subscriptions for live updates
- Replace static data in `app/dashboard/buyer/page.tsx`
