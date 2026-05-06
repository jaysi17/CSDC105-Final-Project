// Seed script — populates the database with a demo user and mock places.
//
// Usage (from the api/ directory):
//   node scripts/seed.js          # add demo user + mock places (skips places that already exist by title for the demo user)
//   node scripts/seed.js --reset  # delete the demo user's existing places first, then re-insert
//
// The demo user uses a known email/password so it can also be used to log in
// during the presentation:
//   email:    demo@stayconnect.com
//   password: demo123

const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User.js');
const Place = require('../models/Place.js');

const DEMO_EMAIL = 'demo@stayconnect.com';
const DEMO_NAME = 'StayConnect Demo';
const DEMO_PASSWORD = 'demo123';

// Photos use direct Unsplash URLs. The existing photo handler in
// client/src/PlaceImg.jsx and the IndexPage check `startsWith('http')` and
// render the URL as-is, so no extra wiring is needed.
const MOCK_PLACES = [
    {
        title: 'Beachfront Villa in El Nido',
        address: 'Corong-Corong Beach, El Nido, Palawan',
        photos: [
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200',
        ],
        description:
            'A stunning beachfront villa with panoramic views of the Bacuit Archipelago. Wake up to the sound of waves and step directly onto white sand. Perfect for couples or small families looking for a private island getaway.',
        perks: ['wifi', 'parking', 'tv', 'pets', 'entrance'],
        extraInfo: 'Check-in is contactless. Please respect quiet hours after 10 PM.',
        checkIn: 14,
        checkOut: 11,
        maxGuests: 6,
        price: 4500,
    },
    {
        title: 'Modern Studio in BGC',
        address: '8th Avenue, Bonifacio Global City, Taguig',
        photos: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
        ],
        description:
            'Sleek studio in the heart of BGC with floor-to-ceiling windows, fast wifi, and a workspace setup ideal for business travelers. Walking distance to High Street and S Maison.',
        perks: ['wifi', 'tv', 'parking'],
        extraInfo: 'Building has 24/7 security and a swimming pool on the 12th floor.',
        checkIn: 15,
        checkOut: 12,
        maxGuests: 2,
        price: 2800,
    },
    {
        title: 'Cozy Mountain Cabin in Baguio',
        address: 'Camp John Hay, Baguio City, Benguet',
        photos: [
            'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200',
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
        ],
        description:
            'Wooden cabin tucked among pine trees with a working fireplace. The perfect cool-weather escape with morning fog rolling through the property. Hot chocolate on arrival included.',
        perks: ['wifi', 'parking', 'pets'],
        extraInfo: 'Bring warm clothes — temperatures drop to 12°C at night.',
        checkIn: 14,
        checkOut: 11,
        maxGuests: 4,
        price: 3200,
    },
    {
        title: 'Surf House by Cloud 9',
        address: 'General Luna, Siargao Island, Surigao del Norte',
        photos: [
            'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200',
            'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200',
            'https://images.unsplash.com/photo-1505881502353-a1986add3762?w=1200',
        ],
        description:
            'Bamboo and nipa surf house a 5-minute walk from Cloud 9. Hammocks on the porch, board rack, and an outdoor rinse-off shower. A favorite among returning surfers.',
        perks: ['wifi', 'pets', 'entrance'],
        extraInfo: 'Free use of beach cruisers. Surfboard rentals available next door.',
        checkIn: 13,
        checkOut: 10,
        maxGuests: 3,
        price: 2200,
    },
    {
        title: 'Heritage House in Vigan',
        address: 'Calle Crisologo, Vigan City, Ilocos Sur',
        photos: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200',
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
        ],
        description:
            'Restored Spanish-era ancestral house on the famous Calle Crisologo. Capiz windows, hardwood floors, and antique furnishings. A walk through Philippine history with modern comforts.',
        perks: ['wifi', 'parking', 'tv'],
        extraInfo: 'Empanadas from across the street are a must-try.',
        checkIn: 14,
        checkOut: 11,
        maxGuests: 8,
        price: 3800,
    },
    {
        title: 'Lakefront Cottage in Tagaytay',
        address: 'Aguinaldo Highway, Tagaytay City, Cavite',
        photos: [
            'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
        ],
        description:
            'Charming cottage with an unobstructed view of Taal Volcano and the lake. Cool breeze year-round, large veranda for bulalo dinners, and a small garden out back.',
        perks: ['wifi', 'parking', 'tv', 'pets'],
        extraInfo: '20 minutes from Sky Ranch and Picnic Grove.',
        checkIn: 14,
        checkOut: 11,
        maxGuests: 5,
        price: 2900,
    },
    {
        title: 'Cliffside Suite in Boracay',
        address: 'Diniwid Beach, Boracay Island, Aklan',
        photos: [
            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
        ],
        description:
            'Sunset suite carved into the Diniwid cliffs, just a quiet 10-minute walk from White Beach. Private balcony with infinity view, queen bed, and rain shower.',
        perks: ['wifi', 'tv', 'entrance'],
        extraInfo: 'Sunset cocktails included on arrival night.',
        checkIn: 15,
        checkOut: 12,
        maxGuests: 2,
        price: 5200,
    },
];

async function main() {
    const reset = process.argv.includes('--reset');

    if (!process.env.MONGO_URL) {
        console.error('MONGO_URL is not defined. Make sure api/.env is set up.');
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    let demoUser = await User.findOne({ email: DEMO_EMAIL });
    if (!demoUser) {
        demoUser = await User.create({
            name: DEMO_NAME,
            email: DEMO_EMAIL,
            password: bcrypt.hashSync(DEMO_PASSWORD, bcrypt.genSaltSync(10)),
        });
        console.log(`Created demo user: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
    } else {
        console.log(`Demo user already exists: ${DEMO_EMAIL}`);
    }

    if (reset) {
        const { deletedCount } = await Place.deleteMany({ owner: demoUser._id });
        console.log(`--reset: deleted ${deletedCount} existing demo place(s)`);
    }

    let inserted = 0;
    let skipped = 0;
    for (const place of MOCK_PLACES) {
        const exists = await Place.findOne({ owner: demoUser._id, title: place.title });
        if (exists) {
            skipped++;
            continue;
        }
        await Place.create({ ...place, owner: demoUser._id });
        inserted++;
    }

    console.log(`Inserted ${inserted} place(s), skipped ${skipped} duplicate(s).`);
    console.log('Done.');
    await mongoose.disconnect();
}

main().catch(async (err) => {
    console.error('Seed failed:', err);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
});
