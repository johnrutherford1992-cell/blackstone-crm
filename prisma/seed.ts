import { PrismaClient, CompanyCategory, LeadStatus, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ── Account ──────────────────────────────────────────────────────────
  const account = await prisma.account.upsert({
    where: { id: "acct_blackstone" },
    update: {},
    create: {
      id: "acct_blackstone",
      name: "Blackstone Construction",
      website: "https://blackstone.com",
      country: "United States",
      timezone: "America/Chicago",
    },
  });

  // ── Users ────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("password123", 10);

  const john = await prisma.user.upsert({
    where: { email: "john@blackstone.com" },
    update: {},
    create: {
      id: "user_john",
      email: "john@blackstone.com",
      firstName: "John",
      lastName: "Rutherford",
      passwordHash,
      role: UserRole.ADMIN,
      accountId: account.id,
    },
  });

  const sarah = await prisma.user.upsert({
    where: { email: "sarah@blackstone.com" },
    update: {},
    create: {
      id: "user_sarah",
      email: "sarah@blackstone.com",
      firstName: "Sarah",
      lastName: "Mitchell",
      passwordHash,
      role: UserRole.ADMIN,
      accountId: account.id,
    },
  });

  const david = await prisma.user.upsert({
    where: { email: "dchen@blackstone.com" },
    update: {},
    create: {
      id: "user_david",
      email: "dchen@blackstone.com",
      firstName: "David",
      lastName: "Chen",
      passwordHash,
      role: UserRole.LIMITED,
      accountId: account.id,
    },
  });

  const emily = await prisma.user.upsert({
    where: { email: "epark@blackstone.com" },
    update: {},
    create: {
      id: "user_emily",
      email: "epark@blackstone.com",
      firstName: "Emily",
      lastName: "Park",
      passwordHash,
      role: UserRole.LIMITED,
      accountId: account.id,
    },
  });

  const mike = await prisma.user.upsert({
    where: { email: "mthompson@blackstone.com" },
    update: {},
    create: {
      id: "user_mike",
      email: "mthompson@blackstone.com",
      firstName: "Mike",
      lastName: "Thompson",
      passwordHash,
      role: UserRole.LIMITED,
      accountId: account.id,
    },
  });

  const james = await prisma.user.upsert({
    where: { email: "jwilson@blackstone.com" },
    update: {},
    create: {
      id: "user_james",
      email: "jwilson@blackstone.com",
      firstName: "James",
      lastName: "Wilson",
      passwordHash,
      role: UserRole.LIMITED,
      accountId: account.id,
    },
  });

  // ── Divisions ────────────────────────────────────────────────────────
  const divisions = await Promise.all(
    ["Commercial", "Industrial", "Residential-Custom", "Healthcare", "Education"].map((name) =>
      prisma.division.upsert({
        where: { accountId_name: { accountId: account.id, name } },
        update: {},
        create: { name, accountId: account.id },
      })
    )
  );
  const divMap = Object.fromEntries(divisions.map((d) => [d.name, d.id]));

  // ── Stages ───────────────────────────────────────────────────────────
  const stageData = [
    { name: "Discovery", color: "#10B981", sortOrder: 1 },
    { name: "Bidding", color: "#3B82F6", sortOrder: 2 },
    { name: "Proposal Sent", color: "#8B5CF6", sortOrder: 3 },
    { name: "Contract Sent", color: "#F59E0B", sortOrder: 4 },
    { name: "Won", color: "#10B981", sortOrder: 5, statusType: "WON" as const },
    { name: "In Construction", color: "#10B981", sortOrder: 6 },
    { name: "Completed", color: "#6B7280", sortOrder: 7 },
    { name: "Lost", color: "#EF4444", sortOrder: 8, statusType: "LOST" as const },
  ];
  const stages = await Promise.all(
    stageData.map((s) =>
      prisma.stage.upsert({
        where: { accountId_name: { accountId: account.id, name: s.name } },
        update: {},
        create: { name: s.name, color: s.color, sortOrder: s.sortOrder, statusType: s.statusType || "OPEN", accountId: account.id },
      })
    )
  );
  const stgMap = Object.fromEntries(stages.map((s) => [s.name, s.id]));

  // ── Industries ───────────────────────────────────────────────────────
  await Promise.all(
    ["Healthcare", "Education", "Technology", "Government", "Retail", "Mixed-Use", "Office", "Industrial"].map((name) =>
      prisma.industry.upsert({
        where: { accountId_name: { accountId: account.id, name } },
        update: {},
        create: { name, accountId: account.id },
      })
    )
  );

  // ── Contract Types ───────────────────────────────────────────────────
  await Promise.all(
    ["GMP", "Lump Sum", "Cost Plus", "Design-Build", "CMAR", "T&M"].map((name) =>
      prisma.contractType.upsert({
        where: { accountId_name: { accountId: account.id, name } },
        update: {},
        create: { name, accountId: account.id },
      })
    )
  );

  // ── Tender Types ─────────────────────────────────────────────────────
  await Promise.all(
    ["Open Bid", "Invited Bid", "Negotiated", "Sole Source"].map((name) =>
      prisma.tenderType.upsert({
        where: { accountId_name: { accountId: account.id, name } },
        update: {},
        create: { name, accountId: account.id },
      })
    )
  );

  // ── Market Sectors ───────────────────────────────────────────────────
  await Promise.all(
    ["Commercial Office", "Healthcare", "Education", "Industrial", "Residential", "Mixed-Use", "Government", "Retail"].map((name) =>
      prisma.marketSector.upsert({
        where: { accountId_name: { accountId: account.id, name } },
        update: {},
        create: { name, accountId: account.id },
      })
    )
  );

  // ── Delivery Methods ─────────────────────────────────────────────────
  await Promise.all(
    ["Design-Bid-Build", "Design-Build", "CM at Risk", "IPD", "Multi-Prime"].map((name) =>
      prisma.deliveryMethod.upsert({
        where: { accountId_name: { accountId: account.id, name } },
        update: {},
        create: { name, accountId: account.id },
      })
    )
  );

  // ── Work Scopes ──────────────────────────────────────────────────────
  await Promise.all(
    ["General Conditions", "Concrete", "Steel", "Mechanical", "Electrical", "Plumbing", "Fire Protection", "Drywall", "Roofing", "Sitework"].map(
      (name) =>
        prisma.workScope.upsert({
          where: { accountId_name: { accountId: account.id, name } },
          update: {},
          create: { name, accountId: account.id },
        })
    )
  );

  // ── Loss Reasons ─────────────────────────────────────────────────────
  await Promise.all(
    ["Price", "Relationship", "Schedule", "Qualifications", "No Bid"].map((name) =>
      prisma.lossReason.upsert({
        where: { accountId_name: { accountId: account.id, name } },
        update: {},
        create: { name, accountId: account.id },
      })
    )
  );

  // ── Companies ────────────────────────────────────────────────────────
  const companyData = [
    { name: "Turner Construction", category: CompanyCategory.TRADE_PARTNER, city: "Austin", state: "TX" },
    { name: "Seton Healthcare", category: CompanyCategory.CLIENT, city: "Austin", state: "TX" },
    { name: "Samsung Austin", category: CompanyCategory.CLIENT, city: "Austin", state: "TX" },
    { name: "Endeavor Real Estate", category: CompanyCategory.CLIENT, city: "Austin", state: "TX" },
    { name: "Simon Property Group", category: CompanyCategory.CLIENT, city: "Indianapolis", state: "IN" },
    { name: "Milestone Community", category: CompanyCategory.CLIENT, city: "Austin", state: "TX" },
    { name: "University of Texas", category: CompanyCategory.CLIENT, city: "Austin", state: "TX" },
    { name: "City of Bee Cave", category: CompanyCategory.CLIENT, city: "Bee Cave", state: "TX" },
    { name: "Tesla Inc", category: CompanyCategory.CLIENT, city: "Austin", state: "TX" },
    { name: "Catellus Development", category: CompanyCategory.CLIENT, city: "Austin", state: "TX" },
    { name: "City of Austin", category: CompanyCategory.CLIENT, city: "Austin", state: "TX" },
    { name: "Whole Foods Market", category: CompanyCategory.CLIENT, city: "Austin", state: "TX" },
    { name: "Gensler", category: CompanyCategory.DESIGN, city: "Austin", state: "TX" },
    { name: "Hensel Phelps", category: CompanyCategory.TRADE_PARTNER, city: "Austin", state: "TX" },
    { name: "Skanska USA", category: CompanyCategory.TRADE_PARTNER, city: "Austin", state: "TX" },
    { name: "DPR Construction", category: CompanyCategory.TRADE_PARTNER, city: "Austin", state: "TX" },
    { name: "HOK", category: CompanyCategory.DESIGN, city: "Austin", state: "TX" },
    { name: "Walter P Moore", category: CompanyCategory.ENGINEERING, city: "Austin", state: "TX" },
  ];

  const companies: Record<string, string> = {};
  for (const c of companyData) {
    const company = await prisma.company.upsert({
      where: { id: `company_${c.name.toLowerCase().replace(/\s+/g, "_")}` },
      update: {},
      create: {
        id: `company_${c.name.toLowerCase().replace(/\s+/g, "_")}`,
        name: c.name,
        category: c.category,
        city: c.city,
        state: c.state,
        accountId: account.id,
      },
    });
    companies[c.name] = company.id;
  }

  // ── Contacts ─────────────────────────────────────────────────────────
  const contactData = [
    { firstName: "Sarah", lastName: "Mitchell", email: "sarah@turnerconstruction.com", company: "Turner Construction", title: "VP of Operations" },
    { firstName: "David", lastName: "Chen", email: "dchen@gensler.com", company: "Gensler", title: "Principal Architect" },
    { firstName: "Maria", lastName: "Rodriguez", email: "mrodriguez@cityofaustin.gov", company: "City of Austin", title: "Project Manager" },
    { firstName: "James", lastName: "Wilson", email: "jwilson@henselphelps.com", company: "Hensel Phelps", title: "Senior Estimator" },
    { firstName: "Emily", lastName: "Park", email: "epark@skanska.com", company: "Skanska USA", title: "Director of Preconstruction" },
    { firstName: "Michael", lastName: "Brown", email: "mbrown@dpr.com", company: "DPR Construction", title: "Project Executive" },
    { firstName: "Lisa", lastName: "Thompson", email: "lthompson@hok.com", company: "HOK", title: "Design Director" },
    { firstName: "Robert", lastName: "Garcia", email: "rgarcia@walterpmoore.com", company: "Walter P Moore", title: "Structural Engineer" },
  ];

  for (const c of contactData) {
    await prisma.contact.upsert({
      where: { id: `contact_${c.email.split("@")[0]}` },
      update: {},
      create: {
        id: `contact_${c.email.split("@")[0]}`,
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        title: c.title,
        companyId: companies[c.company],
        accountId: account.id,
      },
    });
  }

  // ── Projects ─────────────────────────────────────────────────────────
  const projectData = [
    { name: "Austin Office Tower", stage: "Discovery", contractValue: 45000000, company: "Turner Construction", division: "Commercial" },
    { name: "Dell Medical Center Expansion", stage: "Bidding", contractValue: 120000000, company: "Seton Healthcare", division: "Commercial" },
    { name: "Samsung Fab Retrofit", stage: "Proposal Sent", contractValue: 85000000, company: "Samsung Austin", division: "Industrial" },
    { name: "Domain Mixed-Use Phase III", stage: "Discovery", contractValue: 62000000, company: "Endeavor Real Estate", division: "Commercial" },
    { name: "Lakeline Mall Renovation", stage: "Won", contractValue: 18000000, company: "Simon Property Group", division: "Commercial" },
    { name: "The Grove at Shoal Creek", stage: "In Construction", contractValue: 95000000, company: "Milestone Community", division: "Residential-Custom" },
    { name: "UT Engineering Building", stage: "Contract Sent", contractValue: 72000000, company: "University of Texas", division: "Commercial" },
    { name: "Bee Cave Library", stage: "Won", contractValue: 12000000, company: "City of Bee Cave", division: "Commercial" },
    { name: "Tesla Warehouse Complex", stage: "Lost", contractValue: 35000000, company: "Tesla Inc", division: "Industrial" },
    { name: "Mueller Town Center", stage: "In Construction", contractValue: 55000000, company: "Catellus Development", division: "Commercial" },
  ];

  for (let i = 0; i < projectData.length; i++) {
    const p = projectData[i];
    await prisma.project.upsert({
      where: { id: `proj_${i + 1}` },
      update: {},
      create: {
        id: `proj_${i + 1}`,
        name: p.name,
        contractValue: p.contractValue,
        stageId: stgMap[p.stage],
        divisionId: divMap[p.division],
        assignedToId: john.id,
        accountId: account.id,
      },
    });

    // Link company to project
    await prisma.projectCompany.upsert({
      where: { projectId_companyId: { projectId: `proj_${i + 1}`, companyId: companies[p.company] } },
      update: {},
      create: {
        projectId: `proj_${i + 1}`,
        companyId: companies[p.company],
        role: CompanyCategory.CLIENT,
      },
    });
  }

  // ── Leads ────────────────────────────────────────────────────────────
  const leadData = [
    { name: "Austin Office Tower", company: "Turner Construction", value: 45000000, lastActivity: new Date("2024-02-15T10:00:00Z") },
    { name: "Dell Medical Center Expansion", company: "Seton Healthcare", value: 120000000, lastActivity: new Date("2024-02-14T15:30:00Z") },
    { name: "Samsung Fab Retrofit", company: "Samsung Austin", value: 85000000, lastActivity: new Date("2024-02-12T09:00:00Z") },
    { name: "Domain Mixed-Use Phase III", company: "Endeavor Real Estate", value: 62000000, lastActivity: new Date("2024-02-10T14:00:00Z") },
    { name: "City Hall Renovation", company: "City of Austin", value: 28000000, lastActivity: new Date("2024-02-08T11:00:00Z") },
    { name: "Tesla Gigafactory Warehouse", company: "Tesla Inc", value: 35000000, lastActivity: new Date("2024-02-06T16:00:00Z") },
    { name: "UT Stadium Expansion", company: "University of Texas", value: 200000000, lastActivity: new Date("2024-02-05T13:00:00Z") },
    { name: "Whole Foods HQ Remodel", company: "Whole Foods Market", value: 15000000, lastActivity: new Date("2024-02-03T10:00:00Z") },
  ];

  for (let i = 0; i < leadData.length; i++) {
    const l = leadData[i];
    await prisma.lead.upsert({
      where: { id: `lead_${i + 1}` },
      update: {},
      create: {
        id: `lead_${i + 1}`,
        name: l.name,
        value: l.value,
        status: LeadStatus.OPEN,
        lastActivity: l.lastActivity,
        companyId: companies[l.company],
        assignedToId: john.id,
        accountId: account.id,
      },
    });
  }

  // ── Workforce Roles ──────────────────────────────────────────────────
  await Promise.all(
    [
      { name: "Project Manager", abbreviation: "PM" },
      { name: "Superintendent", abbreviation: "SI" },
      { name: "Project Engineer", abbreviation: "PE" },
      { name: "Estimator", abbreviation: "EST" },
      { name: "Assistant Project Manager", abbreviation: "APM" },
    ].map((r) =>
      prisma.workforceRole.upsert({
        where: { accountId_abbreviation: { accountId: account.id, abbreviation: r.abbreviation } },
        update: {},
        create: { name: r.name, abbreviation: r.abbreviation, accountId: account.id },
      })
    )
  );

  // ── Cost Codes ───────────────────────────────────────────────────────
  await Promise.all(
    [
      { code: "01", description: "General Requirements" },
      { code: "02", description: "Sitework" },
      { code: "03", description: "Concrete" },
      { code: "04", description: "Masonry" },
      { code: "05", description: "Steel" },
      { code: "06", description: "Wood & Plastics" },
      { code: "07", description: "Thermal & Moisture Protection" },
      { code: "08", description: "Doors & Windows" },
      { code: "09", description: "Finishes" },
      { code: "15", description: "Mechanical" },
      { code: "16", description: "Electrical" },
    ].map((c) =>
      prisma.costCode.upsert({
        where: { accountId_code: { accountId: account.id, code: c.code } },
        update: {},
        create: { code: c.code, description: c.description, accountId: account.id },
      })
    )
  );

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
