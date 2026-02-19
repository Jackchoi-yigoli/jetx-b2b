import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Helper: map kebab-case mock values to Prisma enum identifiers (underscore_case)
function e(val: string): string {
  return val.replace(/-/g, '_');
}

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  console.log('Clearing existing data...');
  // Delete in reverse dependency order
  const tables = [
    'report_deliveries', 'scheduled_reports',
    'cctv_storage', 'cctv_recordings', 'cameras',
    'activity_logs', 'invitations', 'role_permissions', 'roles',
    '_TeamMemberSites', 'team_members',
    'notification_templates',
    'campaign_site_opt_outs', 'eligibility_rules', '_CampaignSites', 'campaigns',
    '_PromoCodeSites', 'promo_codes',
    'dynamic_pricing_rules', '_ComboAddonPrices', 'combo_packages', 'addon_prices', 'wash_prices',
    'pricing_template_assignments', 'pricing_templates',
    'billing_records', 'subscriptions', 'plan_site_configs', 'plan_features', 'membership_plans',
    'ticket_messages', 'tickets',
    'maintenance_records', 'machine_alerts', 'machine_sensors', 'machines',
    'transactions', 'vehicles', 'customers',
    'knowledge_articles',
    'security_settings', 'login_sessions', 'user_preferences', 'webhooks', 'integrations', 'api_keys',
    'sites', 'operators',
  ];
  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(`DELETE FROM "${table}"`);
    } catch {
      // Table may not exist yet
    }
  }

  console.log('Seeding operators...');
  await prisma.operator.createMany({
    data: [
      {
        id: 'op-clean-master',
        name: 'CleanMaster Taiwan',
        status: 'active',
        contractType: 'franchise',
        contractStart: new Date('2023-01-15'),
        contractEnd: new Date('2028-01-14'),
        revenueSharePct: 15,
        territory: 'Northern Taiwan',
        siteLimit: 10,
        contact: { name: 'James Chen', position: 'Regional Director', email: 'james.chen@cleanmaster.tw', phone: '+886-2-2345-6789', address: '100 Zhongxiao East Road, Section 4, Da'an District, Taipei 106' },
        taxId: 'TW-12345678',
        businessRegistrationNumber: 'BR-2023-001',
        country: 'Taiwan',
      },
      {
        id: 'op-sparkle-wash',
        name: 'SparkleWash Group',
        status: 'active',
        contractType: 'license',
        contractStart: new Date('2023-06-01'),
        contractEnd: new Date('2026-05-31'),
        revenueSharePct: 12,
        territory: 'Central Taiwan',
        siteLimit: 5,
        contact: { name: 'Lisa Wang', position: 'Operations Manager', email: 'lisa.wang@sparklewash.tw', phone: '+886-4-2345-6789', address: '200 Taiwan Boulevard, Section 2, Xitun District, Taichung 407' },
        taxId: 'TW-87654321',
        businessRegistrationNumber: 'BR-2023-002',
        country: 'Taiwan',
      },
    ],
  });

  console.log('Seeding sites...');
  await prisma.site.createMany({
    data: [
      {
        id: 'site-mainst',
        operatorId: 'op-clean-master',
        siteCode: 'CM-TPE-001',
        name: 'Main Street Wash Center',
        location: 'Taipei, Taiwan',
        address: '123 Zhongxiao East Road, Section 4, Da\'an District, Taipei 106',
        type: 'full_service',
        status: 'online',
        operatingHours: { monday: '06:00-22:00', tuesday: '06:00-22:00', wednesday: '06:00-22:00', thursday: '06:00-22:00', friday: '06:00-23:00', saturday: '07:00-23:00', sunday: '07:00-21:00' },
        equipmentType: 'Tunnel + Rollover',
        contact: { name: 'David Lin', phone: '+886-2-2345-0001' },
        bayCount: 4,
        pricingTemplateId: 'pt-standard',
        coordinates: { lat: 25.0418, lng: 121.5497 },
      },
      {
        id: 'site-downtown',
        operatorId: 'op-clean-master',
        siteCode: 'CM-TPE-002',
        name: 'Downtown Express Wash',
        location: 'Taipei, Taiwan',
        address: '456 Xinyi Road, Section 5, Xinyi District, Taipei 110',
        type: 'self_service',
        status: 'online',
        operatingHours: { monday: '00:00-23:59', tuesday: '00:00-23:59', wednesday: '00:00-23:59', thursday: '00:00-23:59', friday: '00:00-23:59', saturday: '00:00-23:59', sunday: '00:00-23:59' },
        equipmentType: 'Self-Service Bays',
        contact: { name: 'Amy Wu', phone: '+886-2-2345-0002' },
        bayCount: 8,
        pricingTemplateId: 'pt-economy',
        coordinates: { lat: 25.033, lng: 121.5654 },
      },
      {
        id: 'site-zhongshan',
        operatorId: 'op-clean-master',
        siteCode: 'CM-TPE-003',
        name: 'Zhongshan Premium Wash',
        location: 'Taipei, Taiwan',
        address: '789 Zhongshan North Road, Section 2, Zhongshan District, Taipei 104',
        type: 'full_service',
        status: 'online',
        operatingHours: { monday: '07:00-21:00', tuesday: '07:00-21:00', wednesday: '07:00-21:00', thursday: '07:00-21:00', friday: '07:00-22:00', saturday: '08:00-22:00', sunday: '08:00-20:00' },
        equipmentType: 'Premium Tunnel',
        contact: { name: 'Michael Chang', phone: '+886-2-2345-0003' },
        bayCount: 3,
        pricingTemplateId: 'pt-premium',
        coordinates: { lat: 25.0636, lng: 121.5228 },
      },
      {
        id: 'site-taichung-1',
        operatorId: 'op-sparkle-wash',
        siteCode: 'SW-TXG-001',
        name: 'Taichung Central Wash',
        location: 'Taichung, Taiwan',
        address: '100 Taiwan Boulevard, Section 1, Central District, Taichung 400',
        type: 'hybrid',
        status: 'online',
        operatingHours: { monday: '06:00-22:00', tuesday: '06:00-22:00', wednesday: '06:00-22:00', thursday: '06:00-22:00', friday: '06:00-23:00', saturday: '07:00-23:00', sunday: '07:00-21:00' },
        equipmentType: 'Tunnel + Self-Service',
        contact: { name: 'Kevin Huang', phone: '+886-4-2345-0001' },
        bayCount: 6,
        pricingTemplateId: 'pt-standard',
        coordinates: { lat: 24.1477, lng: 120.6736 },
      },
      {
        id: 'site-taichung-2',
        operatorId: 'op-sparkle-wash',
        siteCode: 'SW-TXG-002',
        name: 'Xitun Quick Wash',
        location: 'Taichung, Taiwan',
        address: '250 Henan Road, Section 3, Xitun District, Taichung 407',
        type: 'self_service',
        status: 'maintenance',
        operatingHours: { monday: '00:00-23:59', tuesday: '00:00-23:59', wednesday: '00:00-23:59', thursday: '00:00-23:59', friday: '00:00-23:59', saturday: '00:00-23:59', sunday: '00:00-23:59' },
        equipmentType: 'Self-Service Bays',
        contact: { name: 'Sarah Lee', phone: '+886-4-2345-0002' },
        bayCount: 4,
        pricingTemplateId: 'pt-economy',
        coordinates: { lat: 24.1699, lng: 120.6415 },
      },
      {
        id: 'site-neihu',
        operatorId: 'op-clean-master',
        siteCode: 'CM-TPE-004',
        name: 'Neihu Tech Park Wash',
        location: 'Taipei, Taiwan',
        address: '88 Ruiguang Road, Neihu District, Taipei 114',
        type: 'full_service',
        status: 'alert',
        operatingHours: { monday: '06:00-22:00', tuesday: '06:00-22:00', wednesday: '06:00-22:00', thursday: '06:00-22:00', friday: '06:00-23:00', saturday: '07:00-23:00', sunday: '07:00-21:00' },
        equipmentType: 'Tunnel + Rollover',
        contact: { name: 'Tom Hsu', phone: '+886-2-2345-0004' },
        bayCount: 5,
        pricingTemplateId: 'pt-standard',
        coordinates: { lat: 25.079, lng: 121.5755 },
      },
    ],
  });

  console.log('Seeding customers...');
  await prisma.customer.createMany({
    data: [
      {
        id: 'cust-001',
        name: 'Chen Wei-Lin',
        email: 'weilin.chen@email.com',
        phone: '+886-912-345-678',
        language: 'zh-TW',
        homeSiteId: 'site-mainst',
        avatarInitials: 'CW',
        joinDate: new Date('2024-03-15'),
        totalSpent: 12450,
        totalWashes: 48,
        lifetimePoints: 6225,
        currentPoints: 2100,
        status: 'active',
        segment: 'vip',
        lastVisit: new Date('2024-12-08'),
        averageSpend: 259.38,
      },
      {
        id: 'cust-002',
        name: 'Lin Mei-Hua',
        email: 'meihua.lin@email.com',
        phone: '+886-923-456-789',
        language: 'zh-TW',
        homeSiteId: 'site-downtown',
        avatarInitials: 'LM',
        joinDate: new Date('2024-06-22'),
        totalSpent: 4280,
        totalWashes: 22,
        lifetimePoints: 2140,
        currentPoints: 890,
        status: 'active',
        segment: 'regular',
        lastVisit: new Date('2024-12-06'),
        averageSpend: 194.55,
      },
      {
        id: 'cust-003',
        name: 'Wang Da-Wei',
        email: 'dawei.wang@email.com',
        phone: '+886-934-567-890',
        language: 'en',
        homeSiteId: 'site-zhongshan',
        avatarInitials: 'WD',
        joinDate: new Date('2024-01-10'),
        totalSpent: 1850,
        totalWashes: 8,
        lifetimePoints: 925,
        currentPoints: 200,
        status: 'at_risk',
        segment: 'at_risk',
        lastVisit: new Date('2024-10-15'),
        averageSpend: 231.25,
      },
    ],
  });

  console.log('Seeding vehicles...');
  await prisma.vehicle.createMany({
    data: [
      { id: 'veh-001', customerId: 'cust-001', make: 'Tesla', model: 'Model 3', plate: 'ABC-1234', color: 'White', year: 2023, fuelType: 'electric', isPrimary: true },
      { id: 'veh-002', customerId: 'cust-002', make: 'Toyota', model: 'Camry', plate: 'DEF-5678', color: 'Silver', year: 2022, fuelType: 'hybrid', isPrimary: true },
    ],
  });

  console.log('Seeding machines...');
  // mach-a5003 is referenced by transactions but not in machines mock data — add as placeholder
  await prisma.machine.createMany({
    data: [
      { id: 'mach-t5001', siteId: 'site-mainst', name: 'Tunnel Wash A', type: 'tunnel', category: 'a5_automatic', bay: 1, status: 'online', model: 'JetX Tunnel Pro 5000', firmware: 'v3.2.1', installDate: new Date('2023-03-15'), lastMaintenance: new Date('2024-12-01'), totalCycles: 45230, dailyCapacity: 120, currentLoad: 45 },
      { id: 'mach-r5002', siteId: 'site-mainst', name: 'Rollover Wash B', type: 'rollover', category: 'a5_automatic', bay: 2, status: 'maintenance', model: 'JetX Rollover 3000', firmware: 'v3.1.8', installDate: new Date('2023-03-15'), lastMaintenance: new Date('2024-11-15'), totalCycles: 38100, dailyCapacity: 80, currentLoad: 0 },
      { id: 'mach-a5003', siteId: 'site-zhongshan', name: 'Premium Tunnel A', type: 'tunnel', category: 'a7_premium', bay: 1, status: 'online', model: 'JetX Premium 7000', firmware: 'v3.2.2', installDate: new Date('2023-06-01'), lastMaintenance: new Date('2024-12-05'), totalCycles: 28950, dailyCapacity: 100, currentLoad: 62 },
      { id: 'mach-s5004', siteId: 'site-downtown', name: 'Self-Service Bay 1', type: 'self_service', category: 'a0_self_service', bay: 1, status: 'online', model: 'JetX Self-Serve 1000', firmware: 'v2.8.5', installDate: new Date('2023-09-01'), lastMaintenance: new Date('2024-11-20'), totalCycles: 15780, dailyCapacity: 60, currentLoad: 30 },
      { id: 'mach-v5005', siteId: 'site-mainst', name: 'Vacuum Station', type: 'vacuum', category: 'a0_self_service', bay: 5, status: 'error', model: 'JetX Vac Pro 200', firmware: 'v2.5.0', installDate: new Date('2023-03-15'), lastMaintenance: new Date('2024-10-01'), totalCycles: 52100, dailyCapacity: 200, currentLoad: 0 },
    ],
  });

  console.log('Seeding machine sensors...');
  await prisma.machineSensor.createMany({
    data: [
      { id: 'sensor-t5001-water', machineId: 'mach-t5001', name: 'Water Pressure', value: 4.2, unit: 'bar', status: 'ok', thresholds: { min: 2.0, max: 6.0 } },
      { id: 'sensor-t5001-temp', machineId: 'mach-t5001', name: 'Water Temperature', value: 42, unit: '°C', status: 'ok', thresholds: { min: 30, max: 55 } },
      { id: 'sensor-t5001-chem', machineId: 'mach-t5001', name: 'Chemical Level', value: 68, unit: '%', status: 'warning', thresholds: { min: 20, max: 100 } },
      { id: 'sensor-t5001-motor', machineId: 'mach-t5001', name: 'Motor RPM', value: 1450, unit: 'RPM', status: 'ok', thresholds: { min: 800, max: 1800 } },
    ],
  });

  console.log('Seeding machine alerts...');
  await prisma.machineAlert.createMany({
    data: [
      { id: 'alert-r5002-001', machineId: 'mach-r5002', siteId: 'site-mainst', type: 'Brush Motor Overload', severity: 'critical', status: 'active', message: 'Brush motor current exceeds safety threshold. Machine stopped automatically.', triggeredAt: new Date('2024-12-08T09:15:00'), acknowledged: false },
      { id: 'alert-v5005-001', machineId: 'mach-v5005', siteId: 'site-mainst', type: 'Suction Motor Failure', severity: 'critical', status: 'active', message: 'Vacuum motor not responding. Error code: VM-ERR-003.', triggeredAt: new Date('2024-12-07T14:30:00'), acknowledged: true, acknowledgedBy: 'John Doe' },
      { id: 'alert-t5001-001', machineId: 'mach-t5001', siteId: 'site-mainst', type: 'Chemical Level Low', severity: 'warning', status: 'acknowledged', message: 'Soap chemical reservoir below 25%. Refill needed within 48 hours.', triggeredAt: new Date('2024-12-08T06:00:00'), acknowledged: true, acknowledgedBy: 'David Lin' },
    ],
  });

  console.log('Seeding maintenance records...');
  await prisma.maintenanceRecord.createMany({
    data: [
      { id: 'maint-t5001-001', machineId: 'mach-t5001', type: 'scheduled', date: new Date('2024-12-01'), technician: 'Tech Team A', description: 'Monthly inspection: brush replacement, nozzle cleaning, belt tension adjustment', status: 'completed', cost: 4500, duration: 120, notes: 'Replaced main brush and 2 side brushes. All nozzles cleaned and calibrated.' },
      { id: 'maint-t5001-002', machineId: 'mach-t5001', type: 'firmware_update', date: new Date('2024-11-15'), technician: 'IT Support', description: 'Firmware update from v3.1.8 to v3.2.1', status: 'completed', cost: 0, duration: 45, notes: 'Updated successfully. New features: improved sensor calibration, energy saving mode.' },
      { id: 'maint-r5002-001', machineId: 'mach-r5002', type: 'emergency', date: new Date('2024-12-08'), technician: 'Tech Team B', description: 'Emergency repair: brush motor overload investigation', status: 'in_progress', cost: 8000, duration: 0, notes: 'Motor showing signs of bearing failure. Replacement parts ordered.' },
    ],
  });

  console.log('Seeding transactions...');
  await prisma.transaction.createMany({
    data: [
      { id: 'txn-20241208-001', dateTime: new Date('2024-12-08T10:15:00'), status: 'completed', duration: 8, customerId: 'cust-001', vehicleId: 'veh-001', siteId: 'site-mainst', operatorId: 'op-clean-master', machineId: 'mach-t5001', serviceType: 'premium', subtotal: 350, discount: 52.5, total: 297.5, paymentMethod: 'membership', pointsEarned: 30, addons: ['interior-fragrance', 'tire-shine'], estimatedDuration: 10 },
      { id: 'txn-20241208-002', dateTime: new Date('2024-12-08T10:30:00'), status: 'completed', duration: 12, customerId: null, vehicleId: null, siteId: 'site-mainst', operatorId: 'op-clean-master', machineId: 'mach-t5001', serviceType: 'deluxe', subtotal: 450, discount: 0, total: 450, paymentMethod: 'credit_card', pointsEarned: 0, addons: ['undercarriage-wash', 'hot-wax'], estimatedDuration: 12 },
      { id: 'txn-20241208-003', dateTime: new Date('2024-12-08T09:45:00'), status: 'in_progress', duration: 5, customerId: 'cust-002', vehicleId: 'veh-002', siteId: 'site-downtown', operatorId: 'op-clean-master', machineId: 'mach-s5004', serviceType: 'basic', subtotal: 150, discount: 0, total: 150, paymentMethod: 'line_pay', pointsEarned: 15, addons: [], estimatedDuration: 8 },
      { id: 'txn-20241208-004', dateTime: new Date('2024-12-08T08:20:00'), status: 'completed', duration: 10, customerId: null, vehicleId: null, siteId: 'site-zhongshan', operatorId: 'op-clean-master', machineId: 'mach-a5003', serviceType: 'ultimate', subtotal: 650, discount: 0, total: 650, paymentMethod: 'apple_pay', pointsEarned: 0, addons: ['interior-fragrance', 'tire-shine', 'hot-wax'], estimatedDuration: 15 },
      { id: 'txn-20241207-001', dateTime: new Date('2024-12-07T15:30:00'), status: 'completed', duration: 6, customerId: 'cust-001', vehicleId: 'veh-001', siteId: 'site-mainst', operatorId: 'op-clean-master', machineId: 'mach-t5001', serviceType: 'basic', subtotal: 200, discount: 30, total: 170, paymentMethod: 'membership', pointsEarned: 17, addons: [], estimatedDuration: 8 },
      { id: 'txn-20241207-002', dateTime: new Date('2024-12-07T14:15:00'), status: 'refunded', duration: 3, customerId: 'cust-003', vehicleId: null, siteId: 'site-zhongshan', operatorId: 'op-clean-master', machineId: 'mach-a5003', serviceType: 'premium', subtotal: 350, discount: 0, total: 350, paymentMethod: 'credit_card', pointsEarned: 0, addons: ['interior-fragrance'], estimatedDuration: 10 },
      { id: 'txn-20241207-003', dateTime: new Date('2024-12-07T11:00:00'), status: 'failed', duration: 0, customerId: null, vehicleId: null, siteId: 'site-taichung-1', operatorId: 'op-sparkle-wash', machineId: 'mach-t5001', serviceType: 'basic', subtotal: 150, discount: 0, total: 150, paymentMethod: 'cash', pointsEarned: 0, addons: [], estimatedDuration: 8 },
      { id: 'txn-20241206-001', dateTime: new Date('2024-12-06T16:45:00'), status: 'completed', duration: 15, customerId: 'cust-001', vehicleId: 'veh-001', siteId: 'site-mainst', operatorId: 'op-clean-master', machineId: 'mach-t5001', serviceType: 'ultimate', subtotal: 650, discount: 97.5, total: 552.5, paymentMethod: 'membership', pointsEarned: 55, addons: ['interior-fragrance', 'tire-shine', 'undercarriage-wash', 'hot-wax'], estimatedDuration: 15 },
      { id: 'txn-20241206-002', dateTime: new Date('2024-12-06T12:30:00'), status: 'completed', duration: 7, customerId: 'cust-002', vehicleId: 'veh-002', siteId: 'site-downtown', operatorId: 'op-clean-master', machineId: 'mach-s5004', serviceType: 'self_service', subtotal: 80, discount: 0, total: 80, paymentMethod: 'jetx_wallet', pointsEarned: 8, addons: [], estimatedDuration: 10 },
      { id: 'txn-20241205-001', dateTime: new Date('2024-12-05T09:00:00'), status: 'completed', duration: 9, customerId: null, vehicleId: null, siteId: 'site-taichung-1', operatorId: 'op-sparkle-wash', machineId: 'mach-t5001', serviceType: 'premium', subtotal: 350, discount: 50, total: 300, paymentMethod: 'credit_card', pointsEarned: 0, addons: ['tire-shine'], estimatedDuration: 10 },
    ],
  });

  console.log('Seeding tickets...');
  for (const ticket of [
    {
      id: 'ticket-001', subject: 'Machine B not starting after maintenance', status: 'open' as const, priority: 'urgent' as const, category: 'equipment' as const, siteId: 'site-mainst', siteName: 'Main Street Wash Center', machineId: 'mach-r5002', machineName: 'Rollover Wash B', assigneeId: 'team-john', assigneeName: 'John Doe', createdBy: 'David Lin', createdAt: new Date('2024-12-08T09:30:00'), updatedAt: new Date('2024-12-08T10:15:00'), slaDue: new Date('2024-12-08T13:30:00'),
      messages: [
        { id: 'msg-001-1', authorName: 'David Lin', authorRole: 'Site Manager', authorAvatar: 'DL', type: 'public' as const, body: 'Machine B (Rollover Wash B) is not starting after the scheduled maintenance yesterday. The display shows error code RM-ERR-101. We have customers waiting and this is our second busiest bay.', createdAt: new Date('2024-12-08T09:30:00'), attachments: [] },
        { id: 'msg-001-2', authorName: 'John Doe', authorRole: 'Admin', authorAvatar: 'JD', type: 'internal' as const, body: 'Checking the maintenance logs. The brush motor was flagged during the last inspection. Dispatching Tech Team B for emergency repair.', createdAt: new Date('2024-12-08T09:45:00'), attachments: [] },
        { id: 'msg-001-3', authorName: 'John Doe', authorRole: 'Admin', authorAvatar: 'JD', type: 'public' as const, body: 'Hi David, we\'ve identified the issue. The brush motor bearings need replacement. Tech Team B is on their way and should arrive within 30 minutes. ETA for repair: 2-3 hours.', createdAt: new Date('2024-12-08T10:15:00'), attachments: [] },
      ],
    },
    {
      id: 'ticket-002', subject: 'Customer requesting refund for incomplete wash', status: 'in_progress' as const, priority: 'high' as const, category: 'billing' as const, siteId: 'site-zhongshan', siteName: 'Zhongshan Premium Wash', machineId: null, machineName: null, assigneeId: 'team-sarah', assigneeName: 'Sarah Kim', createdBy: 'Michael Chang', createdAt: new Date('2024-12-07T14:20:00'), updatedAt: new Date('2024-12-08T09:00:00'), slaDue: new Date('2024-12-09T14:20:00'),
      messages: [
        { id: 'msg-002-1', authorName: 'Michael Chang', authorRole: 'Site Manager', authorAvatar: 'MC', type: 'public' as const, body: 'Customer Wang Da-Wei (cust-003) is requesting a full refund for transaction txn-20241207-002. The premium wash cycle stopped midway due to a sensor error. Customer says his car was left with soap residue.', createdAt: new Date('2024-12-07T14:20:00'), attachments: [] },
        { id: 'msg-002-2', authorName: 'Sarah Kim', authorRole: 'Support', authorAvatar: 'SK', type: 'public' as const, body: 'I\'ve reviewed the transaction logs. The machine did indeed stop at the rinse stage. Processing a full refund of NT$350 plus 500 bonus loyalty points as compensation. I\'ll also offer a complimentary premium wash on the next visit.', createdAt: new Date('2024-12-08T09:00:00'), attachments: [] },
      ],
    },
    {
      id: 'ticket-003', subject: 'Request to update site operating hours for holidays', status: 'resolved' as const, priority: 'low' as const, category: 'customer_service' as const, siteId: 'site-taichung-1', siteName: 'Taichung Central Wash', machineId: null, machineName: null, assigneeId: 'team-john', assigneeName: 'John Doe', createdBy: 'Kevin Huang', createdAt: new Date('2024-12-05T11:00:00'), updatedAt: new Date('2024-12-06T15:30:00'), slaDue: new Date('2024-12-12T11:00:00'),
      messages: [
        { id: 'msg-003-1', authorName: 'Kevin Huang', authorRole: 'Site Manager', authorAvatar: 'KH', type: 'public' as const, body: 'Requesting operating hours update for the upcoming holiday season (Dec 20 - Jan 5). We would like to extend hours to 06:00-24:00 on weekdays and 24/7 on weekends due to expected high demand.', createdAt: new Date('2024-12-05T11:00:00'), attachments: [] },
        { id: 'msg-003-2', authorName: 'John Doe', authorRole: 'Admin', authorAvatar: 'JD', type: 'public' as const, body: 'Holiday hours have been configured in the system. The changes will take effect automatically on December 20th. I\'ve also set up the dynamic pricing rules for peak holiday hours as discussed. Please verify the schedule looks correct in your site dashboard.', createdAt: new Date('2024-12-06T15:30:00'), attachments: [] },
      ],
    },
  ]) {
    const { messages, ...ticketData } = ticket;
    await prisma.ticket.create({
      data: {
        ...ticketData,
        messages: { create: messages },
      },
    });
  }

  console.log('Seeding membership plans...');
  await prisma.membershipPlan.createMany({
    data: [
      { id: 'plan-basic', name: 'Basic Wash Plan', description: 'Perfect for regular washers who want simple, reliable cleaning at a great price.', tier: 'basic', tierColor: '#6B7280', status: 'active', basePrice: 299, billingCycle: 'monthly', annualDiscountPct: 10, scope: 'single_site', washesPerMonth: 4, addonDiscountPct: 10, pointsMultiplier: 1.5, benefits: ['4 basic washes per month', '10% off add-ons', '1.5x loyalty points', 'Priority lane access'] },
      { id: 'plan-premium', name: 'Premium Wash Plan', description: 'Upgrade your wash experience with premium features and exclusive perks.', tier: 'premium', tierColor: '#3B82F6', status: 'active', basePrice: 599, billingCycle: 'monthly', annualDiscountPct: 15, scope: 'single_site', washesPerMonth: 8, addonDiscountPct: 20, pointsMultiplier: 2, benefits: ['8 premium washes per month', '20% off add-ons', '2x loyalty points', 'Priority lane access', 'Free interior fragrance', 'Monthly vehicle inspection'] },
      { id: 'plan-unlimited', name: 'Unlimited Wash Plan', description: 'The ultimate car care solution with unlimited washes and VIP treatment.', tier: 'unlimited', tierColor: '#8B5CF6', status: 'active', basePrice: 999, billingCycle: 'monthly', annualDiscountPct: 20, scope: 'multi_site', washesPerMonth: -1, addonDiscountPct: 30, pointsMultiplier: 3, benefits: ['Unlimited washes at any site', '30% off all add-ons', '3x loyalty points', 'VIP priority lane', 'Free premium add-ons monthly', 'Dedicated account manager', 'Annual vehicle detailing'] },
    ],
  });

  console.log('Seeding plan features...');
  await prisma.planFeature.createMany({
    data: [
      // Basic plan features
      { id: 'pf-basic-1', planId: 'plan-basic', feature: 'Basic exterior wash', included: true },
      { id: 'pf-basic-2', planId: 'plan-basic', feature: 'Air dry', included: true },
      { id: 'pf-basic-3', planId: 'plan-basic', feature: 'Premium wash', included: false },
      { id: 'pf-basic-4', planId: 'plan-basic', feature: 'Interior cleaning', included: false },
      // Premium plan features
      { id: 'pf-premium-1', planId: 'plan-premium', feature: 'Basic exterior wash', included: true },
      { id: 'pf-premium-2', planId: 'plan-premium', feature: 'Premium wash', included: true },
      { id: 'pf-premium-3', planId: 'plan-premium', feature: 'Air dry + Hand dry', included: true },
      { id: 'pf-premium-4', planId: 'plan-premium', feature: 'Interior fragrance', included: true },
      { id: 'pf-premium-5', planId: 'plan-premium', feature: 'Interior cleaning', included: false },
      // Unlimited plan features
      { id: 'pf-unlimited-1', planId: 'plan-unlimited', feature: 'All wash types', included: true },
      { id: 'pf-unlimited-2', planId: 'plan-unlimited', feature: 'Premium hand dry', included: true },
      { id: 'pf-unlimited-3', planId: 'plan-unlimited', feature: 'Interior cleaning', included: true },
      { id: 'pf-unlimited-4', planId: 'plan-unlimited', feature: 'Interior fragrance', included: true },
      { id: 'pf-unlimited-5', planId: 'plan-unlimited', feature: 'Undercarriage wash', included: true },
    ],
  });

  console.log('Seeding subscriptions...');
  await prisma.subscription.createMany({
    data: [
      { id: 'sub-001', customerId: 'cust-001', planId: 'plan-premium', siteId: 'site-mainst', status: 'active', startDate: new Date('2024-06-15'), renewalDate: new Date('2025-01-15'), autoRenewal: true, washesUsed: 6, billingDay: 15, paymentMethod: 'credit-card ending in 4242', monthlyAmount: 599 },
      { id: 'sub-002', customerId: 'cust-002', planId: 'plan-basic', siteId: 'site-downtown', status: 'active', startDate: new Date('2024-08-01'), renewalDate: new Date('2025-01-01'), autoRenewal: true, washesUsed: 3, billingDay: 1, paymentMethod: 'LINE Pay auto-debit', monthlyAmount: 299 },
      { id: 'sub-003', customerId: 'cust-003', planId: 'plan-premium', siteId: 'site-zhongshan', status: 'cancelled', startDate: new Date('2024-03-01'), renewalDate: new Date('2024-12-01'), autoRenewal: false, washesUsed: 0, billingDay: 1, paymentMethod: 'credit-card ending in 8888', monthlyAmount: 599, cancelDate: new Date('2024-11-15'), cancelReason: 'not_using_enough' },
      { id: 'sub-004', customerId: 'cust-001', planId: 'plan-unlimited', siteId: 'site-mainst', status: 'active', startDate: new Date('2024-01-15'), renewalDate: new Date('2025-01-15'), autoRenewal: true, washesUsed: 12, billingDay: 15, paymentMethod: 'Apple Pay', monthlyAmount: 999 },
      { id: 'sub-005', customerId: 'cust-002', planId: 'plan-basic', siteId: 'site-taichung-1', status: 'expiring_soon', startDate: new Date('2024-09-10'), renewalDate: new Date('2024-12-10'), autoRenewal: false, washesUsed: 2, billingDay: 10, paymentMethod: 'credit-card ending in 5566', monthlyAmount: 299 },
    ],
  });

  console.log('Seeding pricing templates...');
  await prisma.pricingTemplate.createMany({
    data: [
      { id: 'pt-standard', name: 'Standard Pricing', description: 'Default pricing template for full-service sites', status: 'active', isDefault: true, currency: 'TWD', memberDiscountPct: 15, siteCount: 3, lastUpdated: new Date('2024-12-01') },
      { id: 'pt-economy', name: 'Economy Pricing', description: 'Budget-friendly pricing for self-service sites', status: 'active', isDefault: false, currency: 'TWD', memberDiscountPct: 10, siteCount: 2, lastUpdated: new Date('2024-11-15') },
      { id: 'pt-premium', name: 'Premium Pricing', description: 'Premium pricing for high-end wash experiences', status: 'active', isDefault: false, currency: 'TWD', memberDiscountPct: 20, siteCount: 1, lastUpdated: new Date('2024-12-05') },
    ],
  });

  console.log('Seeding wash prices...');
  await prisma.washPrice.createMany({
    data: [
      // Standard template
      { id: 'wp-std-basic', templateId: 'pt-standard', serviceType: 'basic', name: 'Basic Wash', price: 200, duration: 8, description: 'Exterior wash with air dry' },
      { id: 'wp-std-premium', templateId: 'pt-standard', serviceType: 'premium', name: 'Premium Wash', price: 350, duration: 10, description: 'Exterior + interior fragrance + tire shine' },
      { id: 'wp-std-deluxe', templateId: 'pt-standard', serviceType: 'deluxe', name: 'Deluxe Wash', price: 450, duration: 12, description: 'Premium + undercarriage + hot wax' },
      { id: 'wp-std-ultimate', templateId: 'pt-standard', serviceType: 'ultimate', name: 'Ultimate Wash', price: 650, duration: 15, description: 'Full service with hand dry and interior cleaning' },
      // Economy template
      { id: 'wp-eco-basic', templateId: 'pt-economy', serviceType: 'basic', name: 'Basic Self-Service', price: 80, duration: 10, description: 'Self-service bay with soap and rinse' },
      { id: 'wp-eco-premium', templateId: 'pt-economy', serviceType: 'premium', name: 'Premium Self-Service', price: 150, duration: 15, description: 'Self-service with foam brush and wax' },
      // Premium template
      { id: 'wp-prem-premium', templateId: 'pt-premium', serviceType: 'premium', name: 'Premium Wash', price: 450, duration: 12, description: 'Premium tunnel wash with ceramic coating' },
      { id: 'wp-prem-ultimate', templateId: 'pt-premium', serviceType: 'ultimate', name: 'Ultimate VIP', price: 850, duration: 20, description: 'VIP wash with hand detail and interior cleaning' },
    ],
  });

  console.log('Seeding addon prices...');
  await prisma.addonPrice.createMany({
    data: [
      { id: 'addon-std-frag', templateId: 'pt-standard', name: 'Interior Fragrance', price: 50, category: 'interior', popular: true },
      { id: 'addon-std-tire', templateId: 'pt-standard', name: 'Tire Shine', price: 80, category: 'exterior', popular: true },
      { id: 'addon-std-under', templateId: 'pt-standard', name: 'Undercarriage Wash', price: 100, category: 'exterior', popular: false },
      { id: 'addon-std-wax', templateId: 'pt-standard', name: 'Hot Wax Coating', price: 120, category: 'protection', popular: true },
      { id: 'addon-std-ceramic', templateId: 'pt-standard', name: 'Ceramic Spray', price: 200, category: 'protection', popular: false },
    ],
  });

  console.log('Seeding promo codes...');
  await prisma.promoCode.createMany({
    data: [
      { id: 'promo-welcome10', code: 'WELCOME10', description: '10% off first wash for new customers', discountType: 'percentage', discountValue: 10, usesCount: 156, usesLimit: 500, validFrom: new Date('2024-11-01'), validUntil: new Date('2025-03-31'), status: 'active', autoApply: false, minPurchaseAmount: null },
      { id: 'promo-holiday25', code: 'HOLIDAY25', description: '25% off during holiday season', discountType: 'percentage', discountValue: 25, usesCount: 89, usesLimit: 200, validFrom: new Date('2024-12-01'), validUntil: new Date('2025-01-05'), status: 'active', autoApply: false, minPurchaseAmount: 200 },
      { id: 'promo-vipfree', code: 'VIPFREE', description: 'Free basic wash for VIP members', discountType: 'free_service', discountValue: 200, usesCount: 34, usesLimit: 100, validFrom: new Date('2024-12-01'), validUntil: new Date('2024-12-31'), status: 'active', autoApply: false, minPurchaseAmount: null },
      { id: 'promo-flat50', code: 'FLAT50', description: 'NT$50 off any wash over NT$300', discountType: 'fixed_amount', discountValue: 50, usesCount: 203, usesLimit: 500, validFrom: new Date('2024-10-01'), validUntil: new Date('2025-01-31'), status: 'active', autoApply: false, minPurchaseAmount: 300 },
      { id: 'promo-summer20', code: 'SUMMER20', description: '20% off summer special washes', discountType: 'percentage', discountValue: 20, usesCount: 445, usesLimit: 500, validFrom: new Date('2024-06-01'), validUntil: new Date('2024-09-30'), status: 'expired', autoApply: false, minPurchaseAmount: null },
      { id: 'promo-weekend15', code: 'WEEKEND15', description: '15% off weekend washes', discountType: 'percentage', discountValue: 15, usesCount: 312, usesLimit: null, validFrom: new Date('2024-11-01'), validUntil: new Date('2025-06-30'), status: 'active', autoApply: false, minPurchaseAmount: null },
      { id: 'promo-refer100', code: 'REFER100', description: 'NT$100 referral bonus credit', discountType: 'fixed_amount', discountValue: 100, usesCount: 78, usesLimit: null, validFrom: new Date('2024-09-01'), validUntil: new Date('2025-12-31'), status: 'active', autoApply: false, minPurchaseAmount: null },
      { id: 'promo-loyalty500', code: 'LOYALTY500', description: 'Free premium wash at 500 loyalty points', discountType: 'free_service', discountValue: 350, usesCount: 12, usesLimit: null, validFrom: new Date('2024-01-01'), validUntil: new Date('2025-12-31'), status: 'active', autoApply: true, autoApplyTrigger: { type: 'loyalty-milestone', threshold: 500 }, minPurchaseAmount: null },
      { id: 'promo-annual20', code: 'ANNUAL20', description: '20% off annual membership upgrade', discountType: 'percentage', discountValue: 20, usesCount: 23, usesLimit: 50, validFrom: new Date('2024-11-15'), validUntil: new Date('2025-02-28'), status: 'active', autoApply: false, minPurchaseAmount: null },
      { id: 'promo-birthday30', code: 'BIRTHDAY30', description: '30% off birthday month special', discountType: 'percentage', discountValue: 30, usesCount: 67, usesLimit: null, validFrom: new Date('2024-01-01'), validUntil: new Date('2025-12-31'), status: 'active', autoApply: true, autoApplyTrigger: { type: 'member-anniversary', daysBeforeAfter: 15 }, minPurchaseAmount: null },
      { id: 'promo-bulk3', code: 'BULK3FREE', description: 'Buy 3 washes get 1 free', discountType: 'free_service', discountValue: 200, usesCount: 156, usesLimit: null, validFrom: new Date('2024-10-01'), validUntil: new Date('2025-03-31'), status: 'active', autoApply: true, autoApplyTrigger: { type: 'bulk-purchase', quantity: 3 }, minPurchaseAmount: null },
      { id: 'promo-offpeak', code: 'OFFPEAK', description: '10% off during off-peak hours (2-5 PM weekdays)', discountType: 'percentage', discountValue: 10, usesCount: 234, usesLimit: null, validFrom: new Date('2024-11-01'), validUntil: new Date('2025-06-30'), status: 'active', autoApply: true, autoApplyTrigger: { type: 'off-peak', hours: { start: '14:00', end: '17:00' }, days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] }, minPurchaseAmount: null },
    ],
  });

  console.log('Seeding campaigns...');
  await prisma.campaign.createMany({
    data: [
      { id: 'camp-holiday', name: 'Holiday Season Special', type: 'email', category: 'seasonal', status: 'active', targetAudience: 'All customers with a wash in the last 90 days', targetSegment: 'all', startDate: new Date('2024-12-01'), endDate: new Date('2025-01-05'), budget: 50000, spent: 23500, reach: 2847, conversions: 412, conversionRate: 14.47, revenue: 185400, offerType: 'percentage_off', offerValue: '25% off all wash types', appliesTo: 'all_wash_types' },
      { id: 'camp-referral', name: 'Refer a Friend Program', type: 'in_app', category: 'referral', status: 'active', targetAudience: 'Active members with 3+ washes', targetSegment: 'regular', startDate: new Date('2024-09-01'), endDate: new Date('2025-03-31'), budget: 100000, spent: 34200, reach: 1256, conversions: 178, conversionRate: 14.17, revenue: 267000, offerType: 'fixed_amount', offerValue: 'NT$100 credit for both referrer and friend', appliesTo: 'all_wash_types' },
      { id: 'camp-loyalty', name: 'VIP Double Points Week', type: 'push', category: 'loyalty', status: 'completed', targetAudience: 'VIP segment members', targetSegment: 'vip', startDate: new Date('2024-11-25'), endDate: new Date('2024-12-01'), budget: 15000, spent: 15000, reach: 523, conversions: 289, conversionRate: 55.26, revenue: 156780, offerType: 'free_upgrade', offerValue: 'Double loyalty points on all washes', appliesTo: 'all_wash_types' },
      { id: 'camp-flash', name: 'Weekend Flash Sale', type: 'sms', category: 'flash_sale', status: 'scheduled', targetAudience: 'All customers who haven\'t washed in 30+ days', targetSegment: 'at_risk', startDate: new Date('2024-12-14'), endDate: new Date('2024-12-15'), budget: 8000, spent: 0, reach: 0, conversions: 0, conversionRate: 0, revenue: 0, offerType: 'percentage_off', offerValue: '40% off premium wash this weekend only', appliesTo: 'premium_only' },
      { id: 'camp-recurring', name: 'Monthly Maintenance Reminder', type: 'email', category: 'recurring', status: 'active', targetAudience: 'Members whose last wash was 25+ days ago', targetSegment: 'all', startDate: new Date('2024-06-01'), endDate: new Date('2025-06-01'), budget: 24000, spent: 14000, reach: 3421, conversions: 890, conversionRate: 26.02, revenue: 445000, offerType: 'free_item', offerValue: 'Free interior fragrance with any wash', appliesTo: 'all_wash_types' },
    ],
  });

  console.log('Seeding notification templates...');
  await prisma.notificationTemplate.createMany({
    data: [
      { id: 'notif-welcome', name: 'Welcome Message', type: 'transactional', channel: 'push', trigger: 'automated', subject: 'Welcome to JetX!', body: 'Welcome to JetX! Start earning points with every wash. Use code WELCOME10 for 10% off your first wash.', enabled: true },
      { id: 'notif-complete', name: 'Wash Completion', type: 'transactional', channel: 'push', trigger: 'automated', subject: 'Your wash is ready!', body: 'Your {{serviceType}} wash is complete! You earned {{points}} loyalty points. Thank you for choosing JetX.', enabled: true },
      { id: 'notif-renew', name: 'Membership Renewal', type: 'reminder', channel: 'email', trigger: 'automated', subject: 'Your JetX membership renews soon', body: 'Your {{planName}} membership will renew on {{renewalDate}}. Current balance: {{amount}}.', enabled: true },
      { id: 'notif-promo', name: 'Promotional Offer', type: 'promotional', channel: 'push', trigger: 'manual', subject: 'Special offer just for you!', body: '{{offerDetails}} — Valid until {{expiryDate}}. Don\'t miss out!', enabled: true },
      { id: 'notif-cancel', name: 'Cancellation Confirmation', type: 'transactional', channel: 'email', trigger: 'automated', subject: 'Membership cancellation confirmed', body: 'Your {{planName}} membership has been cancelled. It will remain active until {{endDate}}.', enabled: true },
      { id: 'notif-points', name: 'Points Milestone', type: 'transactional', channel: 'in_app', trigger: 'automated', subject: 'Congratulations!', body: 'You\'ve reached {{milestone}} loyalty points! Unlock your next reward.', enabled: true },
      { id: 'notif-inactive', name: 'Re-engagement', type: 'promotional', channel: 'email', trigger: 'automated', subject: 'We miss you at JetX!', body: 'It\'s been a while since your last wash. Come back and enjoy {{offer}} on your next visit!', enabled: false },
    ],
  });

  console.log('Seeding team members...');
  await prisma.teamMember.createMany({
    data: [
      { id: 'team-john', name: 'John Doe', email: 'john@jetx.com', phone: '+886-912-000-001', role: 'admin', avatar: 'JD', status: 'active', joinedAt: new Date('2023-01-15'), lastActive: new Date('2024-12-08T10:30:00'), twoFactorEnabled: true, twoFactorMethod: 'authenticator_app', ticketsAssigned: 12, ticketsResolved: 45 },
      { id: 'team-sarah', name: 'Sarah Kim', email: 'sarah@jetx.com', phone: '+886-912-000-002', role: 'manager', avatar: 'SK', status: 'active', joinedAt: new Date('2023-03-01'), lastActive: new Date('2024-12-08T09:45:00'), twoFactorEnabled: true, twoFactorMethod: 'email', ticketsAssigned: 8, ticketsResolved: 32 },
      { id: 'team-mike', name: 'Mike Chen', email: 'mike@jetx.com', phone: '+886-912-000-003', role: 'operator', avatar: 'MC', status: 'active', joinedAt: new Date('2023-06-15'), lastActive: new Date('2024-12-08T08:30:00'), twoFactorEnabled: false, ticketsAssigned: 5, ticketsResolved: 18 },
      { id: 'team-emily', name: 'Emily Wang', email: 'emily@jetx.com', phone: '+886-912-000-004', role: 'site_manager', avatar: 'EW', status: 'active', joinedAt: new Date('2023-09-01'), lastActive: new Date('2024-12-07T17:00:00'), twoFactorEnabled: true, twoFactorMethod: 'authenticator_app', ticketsAssigned: 3, ticketsResolved: 15 },
      { id: 'team-david', name: 'David Lee', email: 'david@jetx.com', phone: '+886-912-000-005', role: 'support', avatar: 'DL', status: 'active', joinedAt: new Date('2024-01-10'), lastActive: new Date('2024-12-08T10:00:00'), twoFactorEnabled: false, ticketsAssigned: 15, ticketsResolved: 28 },
      { id: 'team-lisa', name: 'Lisa Huang', email: 'lisa@jetx.com', phone: '+886-912-000-006', role: 'viewer', avatar: 'LH', status: 'inactive', joinedAt: new Date('2024-03-01'), lastActive: new Date('2024-11-15T14:00:00'), twoFactorEnabled: false, ticketsAssigned: 0, ticketsResolved: 0 },
      { id: 'team-alex', name: 'Alex Wu', email: 'alex@jetx.com', phone: '+886-912-000-007', role: 'operator', avatar: 'AW', status: 'active', joinedAt: new Date('2024-06-01'), lastActive: new Date('2024-12-08T07:30:00'), twoFactorEnabled: true, twoFactorMethod: 'sms', ticketsAssigned: 7, ticketsResolved: 12 },
      { id: 'team-nina', name: 'Nina Park', email: 'nina@jetx.com', phone: '+886-912-000-008', role: 'support', avatar: 'NP', status: 'invited', joinedAt: new Date('2024-12-05'), lastActive: null, twoFactorEnabled: false, ticketsAssigned: 0, ticketsResolved: 0 },
    ],
  });

  console.log('Seeding roles...');
  for (const role of [
    { id: 'role-admin', name: 'admin' as const, description: 'Full system access', permissions: [
      { resource: 'dashboard', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'full' as const },
      { resource: 'operators', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'full' as const },
      { resource: 'sites', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'full' as const },
      { resource: 'customers', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'full' as const },
      { resource: 'transactions', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'full' as const },
      { resource: 'tickets', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'full' as const },
      { resource: 'settings', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'full' as const },
    ]},
    { id: 'role-manager', name: 'manager' as const, description: 'Management access with limited admin', permissions: [
      { resource: 'dashboard', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'none' as const },
      { resource: 'operators', view: 'full' as const, create: 'none' as const, edit: 'full' as const, delete: 'none' as const },
      { resource: 'sites', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'none' as const },
      { resource: 'customers', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'none' as const },
      { resource: 'transactions', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'none' as const },
      { resource: 'tickets', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'none' as const },
      { resource: 'settings', view: 'read' as const, create: 'none' as const, edit: 'none' as const, delete: 'none' as const },
    ]},
    { id: 'role-operator', name: 'operator' as const, description: 'Day-to-day operations', permissions: [
      { resource: 'dashboard', view: 'read' as const, create: 'none' as const, edit: 'none' as const, delete: 'none' as const },
      { resource: 'sites', view: 'read' as const, create: 'none' as const, edit: 'read' as const, delete: 'none' as const },
      { resource: 'transactions', view: 'full' as const, create: 'full' as const, edit: 'read' as const, delete: 'none' as const },
      { resource: 'tickets', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'none' as const },
    ]},
    { id: 'role-site-manager', name: 'site_manager' as const, description: 'Site-specific management', permissions: [
      { resource: 'dashboard', view: 'read' as const, create: 'none' as const, edit: 'none' as const, delete: 'none' as const },
      { resource: 'sites', view: 'read' as const, create: 'none' as const, edit: 'full' as const, delete: 'none' as const },
      { resource: 'transactions', view: 'read' as const, create: 'full' as const, edit: 'none' as const, delete: 'none' as const },
      { resource: 'tickets', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'none' as const },
    ]},
    { id: 'role-support', name: 'support' as const, description: 'Customer support', permissions: [
      { resource: 'customers', view: 'full' as const, create: 'none' as const, edit: 'read' as const, delete: 'none' as const },
      { resource: 'tickets', view: 'full' as const, create: 'full' as const, edit: 'full' as const, delete: 'none' as const },
      { resource: 'transactions', view: 'read' as const, create: 'none' as const, edit: 'none' as const, delete: 'none' as const },
    ]},
    { id: 'role-viewer', name: 'viewer' as const, description: 'Read-only access', permissions: [
      { resource: 'dashboard', view: 'read' as const, create: 'none' as const, edit: 'none' as const, delete: 'none' as const },
      { resource: 'sites', view: 'read' as const, create: 'none' as const, edit: 'none' as const, delete: 'none' as const },
      { resource: 'transactions', view: 'read' as const, create: 'none' as const, edit: 'none' as const, delete: 'none' as const },
    ]},
  ]) {
    const { permissions, ...roleData } = role;
    await prisma.role.create({
      data: {
        ...roleData,
        permissions: {
          create: permissions.map((p, i) => ({
            id: `${role.id}-perm-${i}`,
            resource: p.resource,
            view: p.view,
            create: p.create,
            edit: p.edit,
            delete: p.delete,
          })),
        },
      },
    });
  }

  console.log('Seeding invitations...');
  await prisma.invitation.createMany({
    data: [
      { id: 'inv-001', email: 'nina@jetx.com', role: 'support', status: 'pending', invitedBy: 'team-john', invitedAt: new Date('2024-12-05'), expiresAt: new Date('2024-12-19') },
      { id: 'inv-002', email: 'peter@partner.com', role: 'viewer', status: 'pending', invitedBy: 'team-john', invitedAt: new Date('2024-12-07'), expiresAt: new Date('2024-12-21') },
      { id: 'inv-003', email: 'grace@cleanmaster.tw', role: 'operator', status: 'expired', invitedBy: 'team-sarah', invitedAt: new Date('2024-11-15'), expiresAt: new Date('2024-11-29') },
    ],
  });

  console.log('Seeding activity logs...');
  await prisma.activityLog.createMany({
    data: [
      { id: 'log-001', userId: 'team-john', action: 'login', target: 'System', details: 'Logged in from Chrome on macOS (192.168.1.1)', timestamp: new Date('2024-12-08T08:00:00') },
      { id: 'log-002', userId: 'team-john', action: 'update', target: 'Site: Main Street Wash Center', details: 'Updated operating hours for holiday schedule', timestamp: new Date('2024-12-08T08:15:00') },
      { id: 'log-003', userId: 'team-sarah', action: 'create', target: 'Ticket #ticket-002', details: 'Created ticket: Customer requesting refund for incomplete wash', timestamp: new Date('2024-12-07T14:20:00') },
      { id: 'log-004', userId: 'team-john', action: 'role_change', target: 'Team Member: Mike Chen', details: 'Changed role from viewer to operator', timestamp: new Date('2024-12-07T10:00:00') },
      { id: 'log-005', userId: 'team-mike', action: 'create', target: 'Transaction #txn-20241207-001', details: 'Processed wash transaction at Main Street (NT$170)', timestamp: new Date('2024-12-07T15:30:00') },
      { id: 'log-006', userId: 'team-john', action: 'invite', target: 'nina@jetx.com', details: 'Invited nina@jetx.com as Support role', timestamp: new Date('2024-12-05T16:00:00') },
      { id: 'log-007', userId: 'team-emily', action: 'update', target: 'Machine: mach-t5001', details: 'Marked maintenance complete for Tunnel Wash A', timestamp: new Date('2024-12-01T14:00:00') },
      { id: 'log-008', userId: 'team-john', action: 'settings_change', target: 'System Settings', details: 'Updated notification preferences', timestamp: new Date('2024-11-28T09:00:00') },
      { id: 'log-009', userId: 'team-john', action: 'export', target: 'Monthly Revenue Report', details: 'Exported November 2024 revenue report (PDF)', timestamp: new Date('2024-12-01T09:30:00') },
      { id: 'log-010', userId: 'team-david', action: 'update', target: 'Ticket #ticket-003', details: 'Resolved ticket: Request to update site operating hours for holidays', timestamp: new Date('2024-12-06T15:30:00') },
      { id: 'log-011', userId: 'team-john', action: 'password_change', target: 'Account', details: 'Password changed successfully', timestamp: new Date('2024-11-20T11:00:00') },
      { id: 'log-012', userId: 'team-john', action: 'failed_login', target: 'System', details: 'Failed login attempt from Moscow, Russia (185.220.101.45)', timestamp: new Date('2024-12-06T03:45:00') },
    ],
  });

  console.log('Seeding cameras...');
  await prisma.camera.createMany({
    data: [
      { id: 'cam-ms-entrance', siteId: 'site-mainst', name: 'Entrance Camera', location: 'Front Entrance', type: 'PTZ', resolution: '4K', status: 'online', isRecording: true },
      { id: 'cam-ms-bay1', siteId: 'site-mainst', name: 'Bay 1 Camera', location: 'Wash Bay 1', type: 'Fixed', resolution: '1080p', status: 'online', isRecording: true },
      { id: 'cam-ms-bay2', siteId: 'site-mainst', name: 'Bay 2 Camera', location: 'Wash Bay 2', type: 'Fixed', resolution: '1080p', status: 'online', isRecording: true },
      { id: 'cam-ms-exit', siteId: 'site-mainst', name: 'Exit Camera', location: 'Exit Lane', type: 'Fixed', resolution: '4K', status: 'online', isRecording: true },
      { id: 'cam-ms-parking', siteId: 'site-mainst', name: 'Parking Lot', location: 'Parking Area', type: 'PTZ', resolution: '1080p', status: 'online', isRecording: true },
      { id: 'cam-dt-entrance', siteId: 'site-downtown', name: 'Entrance Camera', location: 'Main Entrance', type: 'PTZ', resolution: '4K', status: 'online', isRecording: true },
      { id: 'cam-dt-bay1', siteId: 'site-downtown', name: 'Bay 1 Camera', location: 'Self-Service Bay 1', type: 'Fixed', resolution: '1080p', status: 'online', isRecording: true },
      { id: 'cam-dt-bay2', siteId: 'site-downtown', name: 'Bay 2 Camera', location: 'Self-Service Bay 2', type: 'Fixed', resolution: '1080p', status: 'offline', isRecording: false },
      { id: 'cam-zs-entrance', siteId: 'site-zhongshan', name: 'Entrance Camera', location: 'Front Gate', type: 'PTZ', resolution: '4K', status: 'online', isRecording: true },
      { id: 'cam-zs-bay1', siteId: 'site-zhongshan', name: 'Premium Bay Camera', location: 'Premium Bay', type: 'Fixed', resolution: '4K', status: 'online', isRecording: true },
      { id: 'cam-tc1-entrance', siteId: 'site-taichung-1', name: 'Main Entrance', location: 'Entrance', type: 'PTZ', resolution: '1080p', status: 'online', isRecording: true },
      { id: 'cam-tc1-bay1', siteId: 'site-taichung-1', name: 'Bay 1', location: 'Tunnel Bay', type: 'Fixed', resolution: '1080p', status: 'online', isRecording: true },
      { id: 'cam-tc2-entrance', siteId: 'site-taichung-2', name: 'Entrance', location: 'Front', type: 'Fixed', resolution: '1080p', status: 'offline', isRecording: false },
      { id: 'cam-nh-entrance', siteId: 'site-neihu', name: 'Tech Park Entrance', location: 'Main Gate', type: 'PTZ', resolution: '4K', status: 'online', isRecording: true },
    ],
  });

  console.log('Seeding CCTV recordings...');
  await prisma.cCTVRecording.createMany({
    data: [
      { id: 'rec-001', cameraId: 'cam-ms-bay2', siteId: 'site-mainst', startTime: new Date('2024-12-08T09:12:00'), duration: 45, size: '128MB', eventType: 'Vehicle damage detected', severity: 'warning', thumbnailUrl: '/thumbnails/rec-001.jpg' },
      { id: 'rec-002', cameraId: 'cam-ms-entrance', siteId: 'site-mainst', startTime: new Date('2024-12-08T08:30:00'), duration: 120, size: '256MB', eventType: 'Unauthorized after-hours access', severity: 'warning', thumbnailUrl: '/thumbnails/rec-002.jpg' },
      { id: 'rec-003', cameraId: 'cam-dt-bay1', siteId: 'site-downtown', startTime: new Date('2024-12-08T07:45:00'), duration: 30, size: '85MB', eventType: 'Equipment malfunction', severity: 'info', thumbnailUrl: '/thumbnails/rec-003.jpg' },
      { id: 'rec-004', cameraId: 'cam-zs-entrance', siteId: 'site-zhongshan', startTime: new Date('2024-12-07T22:15:00'), duration: 60, size: '160MB', eventType: 'Motion detected after hours', severity: 'warning', thumbnailUrl: '/thumbnails/rec-004.jpg' },
      { id: 'rec-005', cameraId: 'cam-ms-parking', siteId: 'site-mainst', startTime: new Date('2024-12-07T16:30:00'), duration: 90, size: '200MB', eventType: 'Parking lot incident', severity: 'warning', thumbnailUrl: '/thumbnails/rec-005.jpg' },
      { id: 'rec-006', cameraId: 'cam-tc1-bay1', siteId: 'site-taichung-1', startTime: new Date('2024-12-07T11:00:00'), duration: 25, size: '72MB', eventType: 'Customer slip and fall', severity: 'warning', thumbnailUrl: '/thumbnails/rec-006.jpg' },
      { id: 'rec-007', cameraId: 'cam-ms-bay1', siteId: 'site-mainst', startTime: new Date('2024-12-06T14:20:00'), duration: 15, size: '42MB', eventType: 'Brush contact alert', severity: 'info', thumbnailUrl: '/thumbnails/rec-007.jpg' },
      { id: 'rec-008', cameraId: 'cam-dt-entrance', siteId: 'site-downtown', startTime: new Date('2024-12-06T06:00:00'), duration: 180, size: '450MB', eventType: 'Morning shift coverage', severity: 'info', thumbnailUrl: '/thumbnails/rec-008.jpg' },
      { id: 'rec-009', cameraId: 'cam-zs-bay1', siteId: 'site-zhongshan', startTime: new Date('2024-12-05T15:45:00'), duration: 35, size: '98MB', eventType: 'Premium bay overflow', severity: 'info', thumbnailUrl: '/thumbnails/rec-009.jpg' },
      { id: 'rec-010', cameraId: 'cam-nh-entrance', siteId: 'site-neihu', startTime: new Date('2024-12-05T09:00:00'), duration: 60, size: '165MB', eventType: 'Morning rush monitoring', severity: 'info', thumbnailUrl: '/thumbnails/rec-010.jpg' },
    ],
  });

  console.log('Seeding CCTV storage...');
  await prisma.cCTVStorage.createMany({
    data: [
      { id: 'storage-mainst', siteId: 'site-mainst', totalCapacityGb: 2000, usedGb: 1420, retentionDays: 30, recordingsCount: 15234 },
      { id: 'storage-downtown', siteId: 'site-downtown', totalCapacityGb: 1000, usedGb: 560, retentionDays: 14, recordingsCount: 8901 },
    ],
  });

  console.log('Seeding knowledge articles...');
  await prisma.knowledgeArticle.createMany({
    data: [
      { id: 'kb-001', title: 'How to reset a wash machine', category: 'equipment', content: 'Step-by-step guide for resetting JetX wash machines after errors or maintenance.', updatedAt: new Date('2024-12-01'), views: 1234, helpfulCount: 98, contentType: 'article' },
      { id: 'kb-002', title: 'Troubleshooting water pressure issues', category: 'equipment', content: 'Diagnosing and resolving low or high water pressure problems.', updatedAt: new Date('2024-11-22'), views: 623, helpfulCount: 54, contentType: 'article' },
      { id: 'kb-003', title: 'New firmware v3.2.2 release notes', category: 'equipment', content: 'Release notes for firmware version 3.2.2.', updatedAt: new Date('2024-12-07'), views: 312, helpfulCount: 28, contentType: 'article' },
      { id: 'kb-004', title: 'Processing refund requests', category: 'billing', content: 'Complete guide to processing customer refunds.', updatedAt: new Date('2024-11-28'), views: 892, helpfulCount: 76, contentType: 'article' },
      { id: 'kb-005', title: 'Holiday pricing configuration guide', category: 'platform', content: 'How to configure seasonal and holiday pricing.', updatedAt: new Date('2024-12-08'), views: 445, helpfulCount: 41, contentType: 'article' },
      { id: 'kb-006', title: 'Daily opening procedures checklist', category: 'operations', content: 'Standardized checklist for site opening procedures.', updatedAt: new Date('2024-11-25'), views: 756, helpfulCount: 68, contentType: 'article' },
      { id: 'kb-007', title: 'Winter weather operating procedures', category: 'operations', content: 'Special procedures for operating during cold weather.', updatedAt: new Date('2024-12-06'), views: 289, helpfulCount: 33, contentType: 'article' },
      { id: 'kb-008', title: 'Managing membership cancellations', category: 'memberships', content: 'Best practices for handling membership cancellation requests.', updatedAt: new Date('2024-11-20'), views: 589, helpfulCount: 52, contentType: 'article' },
      { id: 'kb-009', title: 'Member referral program guide', category: 'memberships', content: 'How to configure and manage the member referral program.', updatedAt: new Date('2024-12-05'), views: 378, helpfulCount: 44, contentType: 'article' },
      { id: 'kb-010', title: 'Getting Started with JetX Platform', category: 'training', content: 'A comprehensive introduction to the JetX B2B platform.', updatedAt: new Date('2024-11-15'), views: 2145, helpfulCount: 187, contentType: 'video', videoDuration: '15 min', videoLevel: 'beginner' },
      { id: 'kb-011', title: 'Machine Maintenance Basics', category: 'training', content: 'Video walkthrough of routine maintenance procedures.', updatedAt: new Date('2024-11-10'), views: 1567, helpfulCount: 134, contentType: 'video', videoDuration: '22 min', videoLevel: 'intermediate' },
      { id: 'kb-012', title: 'Advanced Reporting Features', category: 'platform', content: 'Deep dive into JetX reporting capabilities.', updatedAt: new Date('2024-11-05'), views: 923, helpfulCount: 89, contentType: 'video', videoDuration: '18 min', videoLevel: 'advanced' },
      { id: 'kb-013', title: 'Customer Service Best Practices', category: 'training', content: 'Training guide for handling common customer service scenarios.', updatedAt: new Date('2024-10-28'), views: 1102, helpfulCount: 97, contentType: 'video', videoDuration: '12 min', videoLevel: 'beginner' },
    ],
  });

  console.log('Seeding scheduled reports...');
  for (const report of [
    { id: 'report-daily-revenue', name: 'Daily Revenue Summary', reportType: 'financial' as const, frequency: 'daily' as const, recipients: ['management@jetx.com'], format: 'pdf' as const, nextRun: new Date('2024-12-09T06:00:00'), lastRun: new Date('2024-12-08T06:00:00'), status: 'active' as const, filters: { dateRange: 'last-7-days' }, deliveries: [
      { id: 'delivery-dr-001', deliveredAt: new Date('2024-12-08T06:00:00'), status: 'success' as const, recipients: ['management@jetx.com'] },
      { id: 'delivery-dr-002', deliveredAt: new Date('2024-12-07T06:00:00'), status: 'success' as const, recipients: ['management@jetx.com'] },
      { id: 'delivery-dr-003', deliveredAt: new Date('2024-12-06T06:00:00'), status: 'success' as const, recipients: ['management@jetx.com'] },
    ]},
    { id: 'report-weekly-ops', name: 'Weekly Operations Report', reportType: 'operations' as const, frequency: 'weekly' as const, recipients: ['ops-team@jetx.com'], format: 'excel' as const, nextRun: new Date('2024-12-09T08:00:00'), lastRun: new Date('2024-12-02T08:00:00'), status: 'active' as const, filters: { dateRange: 'last-7-days' }, deliveries: [
      { id: 'delivery-wo-001', deliveredAt: new Date('2024-12-02T08:00:00'), status: 'failed' as const, recipients: ['ops-team@jetx.com'], errorMessage: 'SMTP connection error: Unable to reach mail server' },
      { id: 'delivery-wo-002', deliveredAt: new Date('2024-11-25T08:00:00'), status: 'success' as const, recipients: ['ops-team@jetx.com'] },
      { id: 'delivery-wo-003', deliveredAt: new Date('2024-11-18T08:00:00'), status: 'success' as const, recipients: ['ops-team@jetx.com'] },
    ]},
    { id: 'report-monthly-revenue', name: 'Monthly Revenue Report', reportType: 'financial' as const, frequency: 'monthly' as const, recipients: ['finance@jetx.com', 'management@jetx.com', 'cfo@jetx.com'], format: 'excel' as const, nextRun: new Date('2025-01-01T09:00:00'), lastRun: new Date('2024-12-01T09:00:00'), status: 'active' as const, filters: { dateRange: 'last-30-days' }, deliveries: [
      { id: 'delivery-mr-001', deliveredAt: new Date('2024-12-01T09:00:00'), status: 'success' as const, recipients: ['finance@jetx.com', 'management@jetx.com', 'cfo@jetx.com'] },
      { id: 'delivery-mr-002', deliveredAt: new Date('2024-11-01T09:00:00'), status: 'success' as const, recipients: ['finance@jetx.com', 'management@jetx.com', 'cfo@jetx.com'] },
    ]},
    { id: 'report-customer-churn', name: 'Customer Churn Alert', reportType: 'customer' as const, frequency: 'weekly' as const, recipients: ['marketing@jetx.com'], format: 'pdf' as const, nextRun: new Date('2024-12-13T17:00:00'), lastRun: new Date('2024-12-06T17:00:00'), status: 'active' as const, filters: { dateRange: 'last-30-days' }, deliveries: [
      { id: 'delivery-cc-001', deliveredAt: new Date('2024-12-06T17:00:00'), status: 'success' as const, recipients: ['marketing@jetx.com'] },
      { id: 'delivery-cc-002', deliveredAt: new Date('2024-11-29T17:00:00'), status: 'success' as const, recipients: ['marketing@jetx.com'] },
    ]},
    { id: 'report-campaign-performance', name: 'Campaign Performance', reportType: 'marketing' as const, frequency: 'weekly' as const, recipients: ['marketing@jetx.com'], format: 'pdf' as const, nextRun: new Date('2024-12-16T09:00:00'), lastRun: new Date('2024-12-02T09:00:00'), status: 'active' as const, filters: { dateRange: 'last-30-days' }, deliveries: [
      { id: 'delivery-cp-001', deliveredAt: new Date('2024-12-02T09:00:00'), status: 'success' as const, recipients: ['marketing@jetx.com'] },
      { id: 'delivery-cp-002', deliveredAt: new Date('2024-11-18T09:00:00'), status: 'success' as const, recipients: ['marketing@jetx.com'] },
    ]},
  ]) {
    const { deliveries, ...reportData } = report;
    await prisma.scheduledReport.create({
      data: {
        ...reportData,
        deliveries: { create: deliveries.map(d => ({ ...d, reportId: undefined })) },
      },
    });
  }

  console.log('Seeding API keys...');
  await prisma.aPIKey.createMany({
    data: [
      { id: 'key-001', name: 'Production API Key', key: 'jx_live_************************5f3a', environment: 'production', permissions: ['transactions:read', 'transactions:write', 'customers:read', 'sites:read', 'reports:read'], rateLimit: 1000, status: 'active', createdAt: new Date('2025-10-15'), lastUsedAt: new Date('2025-12-08T10:08:00') },
      { id: 'key-002', name: 'Mobile App Integration', key: 'jx_live_************************8b2c', environment: 'production', permissions: ['customers:read', 'memberships:read', 'sites:read'], rateLimit: 500, status: 'active', createdAt: new Date('2025-11-20'), lastUsedAt: new Date('2025-12-08T10:05:00') },
      { id: 'key-003', name: 'Development Testing', key: 'jx_test_************************7d1e', environment: 'testing', permissions: ['all:read', 'all:write'], rateLimit: 100, status: 'active', createdAt: new Date('2025-12-01'), lastUsedAt: new Date('2025-12-08T09:10:00') },
      { id: 'key-004', name: 'Legacy Integration (Deprecated)', key: 'jx_live_************************9a4f', environment: 'production', permissions: [], rateLimit: 0, status: 'revoked', createdAt: new Date('2025-08-05'), lastUsedAt: new Date('2025-11-15') },
    ],
  });

  console.log('Seeding integrations...');
  await prisma.integration.createMany({
    data: [
      { id: 'int-slack', name: 'Slack', description: 'Slack workspace notifications', category: 'notification', status: 'connected', configuredAt: new Date('2025-09-01'), icon: 'slack' },
      { id: 'int-google', name: 'Google Workspace', description: 'Google Workspace CRM integration', category: 'crm', status: 'connected', configuredAt: new Date('2025-08-15'), icon: 'google' },
      { id: 'int-stripe', name: 'Stripe', description: 'Stripe payment processing', category: 'payment', status: 'connected', configuredAt: new Date('2025-07-20'), icon: 'stripe' },
      { id: 'int-quickbooks', name: 'QuickBooks', description: 'QuickBooks accounting integration', category: 'accounting', status: 'disconnected', icon: 'quickbooks' },
      { id: 'int-zapier', name: 'Zapier', description: 'Zapier automation platform', category: 'crm', status: 'disconnected', icon: 'zapier' },
      { id: 'int-jira', name: 'Jira', description: 'Jira project management', category: 'crm', status: 'disconnected', icon: 'jira' },
      { id: 'int-teams', name: 'Microsoft Teams', description: 'Microsoft Teams notifications', category: 'notification', status: 'disconnected', icon: 'teams' },
      { id: 'int-powerbi', name: 'Power BI', description: 'Power BI analytics dashboards', category: 'analytics', status: 'disconnected', icon: 'powerbi' },
      { id: 'int-whatsapp', name: 'WhatsApp Business', description: 'WhatsApp Business messaging', category: 'notification', status: 'disconnected', icon: 'whatsapp' },
      { id: 'int-line', name: 'LINE Notify', description: 'LINE Notify messaging', category: 'notification', status: 'disconnected', icon: 'line' },
      { id: 'int-datadog', name: 'Datadog', description: 'Datadog monitoring and analytics', category: 'analytics', status: 'disconnected', icon: 'datadog' },
    ],
  });

  console.log('Seeding webhooks...');
  await prisma.webhook.createMany({
    data: [
      { id: 'wh-001', name: 'Production Events', url: 'https://api.mycompany.com/webhooks/jetx', events: ['transaction.completed', 'equipment.alert', 'membership.changed'], status: 'active', secret: 'whsec_prod_abc123xyz789', lastTriggeredAt: new Date('2025-12-08T10:05:00'), failureCount: 0 },
      { id: 'wh-002', name: 'Analytics Pipeline', url: 'https://analytics.internal/ingest', events: ['transaction.completed', 'customer.created'], status: 'active', secret: 'whsec_analytics_def456uvw012', lastTriggeredAt: new Date('2025-12-08T09:55:00'), failureCount: 0 },
    ],
  });

  console.log('Seeding user preferences...');
  await prisma.userPreferences.create({
    data: {
      userId: 'team-john',
      language: 'en',
      timezone: 'Asia/Taipei',
      dateFormat: 'MM/DD/YYYY',
      currency: 'TWD',
      theme: 'light',
      notificationPreferences: [
        { eventType: 'daily-summary', channels: { email: true, push: false, inApp: true } },
        { eventType: 'critical-alerts', channels: { email: true, push: true, inApp: true } },
        { eventType: 'new-tickets', channels: { email: true, push: true, inApp: true } },
        { eventType: 'weekly-reports', channels: { email: true, push: false, inApp: false } },
        { eventType: 'urgent-alerts', channels: { email: true, push: true, inApp: true } },
        { eventType: 'ticket-updates', channels: { email: true, push: true, inApp: true } },
        { eventType: 'equipment-status', channels: { email: false, push: false, inApp: true } },
      ],
    },
  });

  console.log('Seeding login sessions...');
  await prisma.loginSession.createMany({
    data: [
      { id: 'sess-001', userId: 'team-john', device: 'Chrome on macOS', location: 'Taipei, Taiwan', ipAddress: '192.168.1.1', loginAt: new Date('2025-12-08T10:30:00'), isCurrent: true, loginStatus: 'success' },
      { id: 'sess-002', userId: 'team-john', device: 'Safari on iPhone', location: 'Taipei, Taiwan', ipAddress: 'Mobile Network', loginAt: new Date('2025-12-08T08:30:00'), isCurrent: false, loginStatus: 'success' },
      { id: 'sess-003', userId: 'team-john', device: 'Chrome on iPad', location: 'Taipei, Taiwan', ipAddress: 'Home WiFi', loginAt: new Date('2025-12-07T20:00:00'), isCurrent: false, loginStatus: 'success' },
      { id: 'sess-004', userId: 'team-john', device: 'Unknown Browser', location: 'Moscow, Russia', ipAddress: '185.220.101.45', loginAt: new Date('2025-12-06T03:45:00'), isCurrent: false, loginStatus: 'failed' },
    ],
  });

  console.log('Seeding security settings...');
  await prisma.securitySettings.create({
    data: {
      userId: 'team-john',
      twoFactorEnabled: true,
      twoFactorMethod: 'authenticator_app',
      backupCodesRemaining: 8,
      backupCodesTotal: 10,
    },
  });

  console.log('Seed completed successfully!');
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
