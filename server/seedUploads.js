const mongoose = require('mongoose');
require('dotenv').config();
const UploadHistory = require('./models/UploadHistory'); 


const userId = '68666424b230002a5575e94b';

const sampleData = [
  {
    user_id: userId,
    file_name: "sales_july01.xlsx",
    file_size: 2048,
    upload_date: new Date("2025-07-01T10:00:00Z"),
    file_path: "uploads/sales_july01.xlsx",
    row_count: 500,
    status: "processed"
  },
  {
    user_id: userId,
    file_name: "marketing_july01.xlsx",
    file_size: 1024,
    upload_date: new Date("2025-07-01T15:30:00Z"),
    file_path: "uploads/marketing_july01.xlsx",
    row_count: 200,
    status: "processed"
  },
  {
    user_id: userId,
    file_name: "finance_july02.xlsx",
    file_size: 3072,
    upload_date: new Date("2025-07-02T09:20:00Z"),
    file_path: "uploads/finance_july02.xlsx",
    row_count: 700,
    status: "processed"
  },
  {
    user_id: userId,
    file_name: "leads_july03.xlsx",
    file_size: 512,
    upload_date: new Date("2025-07-03T12:00:00Z"),
    file_path: "uploads/leads_july03.xlsx",
    row_count: 150,
    status: "processed"
  },
  {
    user_id: userId,
    file_name: "survey_july05.xlsx",
    file_size: 4096,
    upload_date: new Date("2025-07-05T16:30:00Z"),
    file_path: "uploads/survey_july05.xlsx",
    row_count: 800,
    status: "processed"
  },
  {
    user_id: userId,
    file_name: "daily_log_july06.xlsx",
    file_size: 256,
    upload_date: new Date("2025-07-06T09:45:00Z"),
    file_path: "uploads/daily_log_july06.xlsx",
    row_count: 100,
    status: "processed"
  },
  {
    user_id: userId,
    file_name: "training_july07.xlsx",
    file_size: 1536,
    upload_date: new Date("2025-07-07T18:00:00Z"),
    file_path: "uploads/training_july07.xlsx",
    row_count: 400,
    status: "processed"
  },
  {
    user_id: userId,
    file_name: "meeting_notes_june28.xlsx",
    file_size: 1000,
    upload_date: new Date("2025-06-28T11:00:00Z"),
    file_path: "uploads/meeting_notes_june28.xlsx",
    row_count: 120,
    status: "processed"
  },
  {
    user_id: userId,
    file_name: "inventory_june30.xlsx",
    file_size: 3000,
    upload_date: new Date("2025-06-30T13:30:00Z"),
    file_path: "uploads/inventory_june30.xlsx",
    row_count: 620,
    status: "processed"
  },
  {
    user_id: userId,
    file_name: "weekly_review_july08.xlsx",
    file_size: 2200,
    upload_date: new Date("2025-07-08T14:10:00Z"),
    file_path: "uploads/weekly_review_july08.xlsx",
    row_count: 350,
    status: "processed"
  },
];

async function seedUploads() {
  try {
    await mongoose.connect('mongodb+srv://ghulemayur784:gAgaAoDN6YFbTsss@cluster0.umgv43v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    await UploadHistory.insertMany(sampleData);
    console.log("Sample upload data inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedUploads();
