import type { Vehicle } from '@/types';

export const vehicles: Vehicle[] = [
  {
    id: 'veh-tesla3',
    customerId: 'cust-45678',
    make: 'Tesla',
    model: 'Model 3',
    plate: 'ABC-1234',
    color: 'Black',
    year: 2023,
    fuelType: 'electric',
    isPrimary: true,
  },
  {
    id: 'veh-rav4',
    customerId: 'cust-45678',
    make: 'Toyota',
    model: 'RAV4',
    plate: 'XYZ-5678',
    color: 'White',
    year: 2022,
    fuelType: 'gasoline',
    isPrimary: false,
  },
];
