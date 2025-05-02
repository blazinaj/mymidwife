# MyMidwife - Pregnancy Care & Support App

MyMidwife is a comprehensive pregnancy care and support application built with React Native and Expo. It provides expectant mothers with a seamless platform to manage their pregnancy journey, connect with healthcare providers, and access essential resources.

## 🌐 Live Demo

Check out the live demo at: [MyMidwife Demo](https://brilliant-manatee-3888d1.netlify.app)

## 🌟 Features

- **Appointment Management**
  - Schedule and track prenatal appointments
  - View appointment details and history
  - Receive reminders and notifications

- **Secure Messaging**
  - Real-time communication with healthcare providers
  - File sharing capabilities
  - Message status tracking (sent/read)

- **Health Tracking**
  - Monitor vital health metrics
  - Track symptoms and mood
  - Record pregnancy milestones

- **Educational Resources**
  - Access pregnancy-related articles and guides
  - Trimester-specific information
  - Nutritional guidance

## 🚀 Technologies Used

- **Framework**: [Expo](https://expo.dev/) (SDK 52)
- **Navigation**: [Expo Router](https://docs.expo.dev/routing/introduction/) v4
- **UI Components**: Custom-built React Native components
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Type Safety**: TypeScript
- **Database**: [Supabase](https://supabase.com/)
- **Development**: Built with [Bolt](https://bolt.new)

## ⚡ Built with Bolt

This project was developed using Bolt, a powerful development platform that provides:

- **Instant Development Environment**: Zero setup required, start coding immediately
- **Real-time Collaboration**: Built-in tools for team collaboration
- **Integrated Tools**: Pre-configured development environment with essential tools
- **Web-First Development**: Optimized for web development with native compatibility
- **Performance Optimization**: Built-in optimizations for better app performance

## 🗃️ Supabase Integration

The app uses Supabase for its backend infrastructure:

### Database Schema

```sql
-- Users table
create table public.users (
  id uuid references auth.users primary key,
  email text unique not null,
  full_name text,
  created_at timestamptz default now()
);

-- Appointments table
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users not null,
  title text not null,
  provider text not null,
  date_time timestamptz not null,
  location text,
  status text default 'upcoming',
  notes text,
  created_at timestamptz default now()
);

-- Health metrics table
create table public.health_metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users not null,
  metric_type text not null,
  value text not null,
  unit text,
  recorded_at timestamptz default now(),
  notes text
);
```

### Security Features

- **Row Level Security (RLS)**: Ensures users can only access their own data
- **JWT Authentication**: Secure authentication using Supabase Auth
- **Data Encryption**: Automatic encryption for sensitive data
- **Backup & Recovery**: Automated backups and point-in-time recovery

### API Integration

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

// Example query
const fetchAppointments = async (userId: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', userId)
    .order('date_time', { ascending: true });

  if (error) throw error;
  return data;
};
```

## 📱 Screenshots

### Home Screen
<img width="263" alt="image" src="https://github.com/user-attachments/assets/d8171e10-ae35-4e8e-887e-84f564040937" />
<img width="261" alt="image" src="https://github.com/user-attachments/assets/2bae18cb-b87c-4b3d-b5fa-b6af25583eec" />

### Appointments
<img width="262" alt="image" src="https://github.com/user-attachments/assets/01482a7e-9701-4cce-91b4-ef46d6044a64" />
<img width="263" alt="image" src="https://github.com/user-attachments/assets/55cbe0d0-4295-4cad-b1c4-455476ce2f27" />

### Messages
<img width="262" alt="image" src="https://github.com/user-attachments/assets/ed1e4543-c4bb-45b3-9018-77237bed34a1" />

### Educational Resources
<img width="263" alt="image" src="https://github.com/user-attachments/assets/a0841b5a-40f4-4a3b-9141-997795716b47" />
<img width="263" alt="image" src="https://github.com/user-attachments/assets/8cd61bfb-13f0-47e7-b128-5e95a6dee9dc" />

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mymidwife.git
   ```

2. Install dependencies:
   ```bash
   cd mymidwife
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your Supabase credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📱 Platform Support

- ✅ Web
- ✅ iOS
- ✅ Android

## 🔒 Security

- Secure communication channels
- Data encryption
- HIPAA-compliant architecture (planned)
- Row Level Security with Supabase
- JWT-based authentication

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo Team](https://expo.dev/) for the amazing framework
- [React Native Community](https://reactnative.dev/) for the platform
- [Supabase Team](https://supabase.com/) for the backend infrastructure
- [Bolt Team](https://bolt.new) for the development platform
- All contributors and supporters of the project
