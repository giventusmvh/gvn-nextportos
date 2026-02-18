-- =============================================
-- Portfolio Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content_url TEXT,
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  tag TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  link TEXT,
  github TEXT,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read published blogs" ON blogs
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read published projects" ON projects
  FOR SELECT USING (is_published = true);

-- Public can insert contacts
CREATE POLICY "Public can insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Service role can do everything (used by admin API routes)
-- Note: service_role key bypasses RLS by default

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =============================================
-- Seed existing projects data
-- =============================================

INSERT INTO projects (title, description, image, tag, tech_stack, link, github, sort_order) VALUES
('Vomara', 'A personal SaaS web app that automatically fetches Indonesian financial news, analyzes sectoral impact using AI, and displays results in an easy-to-understand dashboard. Emitting clear market direction signals from the noise of news.', '/images/projects/vomara.png', ARRAY['All', 'Web'], ARRAY['React', 'Vite', 'TypeScript', 'Go', 'PostgreSQL', 'AI/LLM'], 'https://market-analyzer-pink.vercel.app/', '-', 1),
('This Portfolio', 'My latest portfolio website made with NextJS and ReactJS, also some react library.', '/images/projects/nextporto.png', ARRAY['All', 'Web'], ARRAY['NextJS', 'ReactJS', 'TailwindCSS'], 'https://giventusmarco.vercel.app/', 'https://github.com/giventusmvh/giventusmarco', 2),
('Indiego', 'Fullstack Website to log order for psychology services, built with Laravel MVC for my intern at PT Talenta Sinergi Group, preview not available, only the code.', '/images/projects/indiego.png', ARRAY['All', 'Web'], ARRAY['Laravel', 'TailwindCSS', 'Javascript'], 'https://giventusmarco.vercel.app/', '-', 3),
('React Essentials', 'Website to learn react essentials, made with ReactJs', '/images/projects/react-essentials.png', ARRAY['All', 'Web'], ARRAY['React'], 'https://gvn-reactstarter.vercel.app/', 'https://github.com/giventusmvh/GvnReactStarter', 4),
('Tic-Tac-Toe', 'Interactive tictactoe website made with ReactJs', '/images/projects/tictactoe.png', ARRAY['All', 'Web'], ARRAY['React'], 'https://gvn-tictactoe.vercel.app/', 'https://github.com/giventusmvh/tictactoe-react', 5),
('Investment Calculator', 'Website to count your investment returns and durations', '/images/projects/investment-calc.png', ARRAY['All', 'Web'], ARRAY['React'], 'https://gvn-investment-calculator.vercel.app/', 'https://github.com/giventusmvh/investment-calculator', 6),
('Post It!', 'Social website to post your thoughts, got some dummy backend to support it, but not deployed yet.', '/images/projects/postit.png', ARRAY['All', 'Web'], ARRAY['React'], 'https://github.com/giventusmvh/react-socialpost', 'https://github.com/giventusmvh/react-socialpost', 7),
('Elvron', 'A company profile website for PT.Talenta Sinergi Group. A holding company focused on investing in the tech industry, and we have several subsidiaries.', '/images/projects/elvron.png', ARRAY['All', 'Web'], ARRAY['HTML', 'Tailwind', 'Javascript', 'Vite'], 'https://elvron.vercel.app/', 'https://github.com/eduwork-development/Elvron', 8),
('MyDoit', 'My Doit is a company profile website about providing an financial ecosystem and enhance business performance and ensure company sustainability effectively and efficiently.', '/images/projects/mydoit.png', ARRAY['All', 'Web'], ARRAY['HTML', 'Tailwind', 'Javascript', 'Vite'], 'https://mydoit.vercel.app/', 'https://github.com/eduwork-development/MyDoit', 9),
('Eduwork', 'Landing Page about Eduwork, which is a company that provides education and training services, often focusing on career development and skill enhancement.', '/images/projects/eduwork.png', ARRAY['All', 'Web'], ARRAY['HTML', 'Tailwind', 'Javascript', 'Vite'], 'https://sosmed.edudev.xyz/lp-b2b', 'https://sosmed.edudev.xyz/lp-b2b', 10),
('Salenda', 'Landing Page for Sale Pisang UMKM', '/images/projects/salenda.png', ARRAY['All', 'Web'], ARRAY['HTML', 'Tailwind', 'Javascript', 'Vite'], 'https://salenda.id/', 'https://github.com/eduwork-development/Sale-Pisang', 11),
('Nyanting', 'Nyanting offers real-time guidance, enhances accuracy, and provides a more accessible learning environment for both beginners and seasoned artisans, using Apple Watch as companion during the process with reminders and feedback.', '/images/projects/nyanting.png', ARRAY['All', 'Mobile'], ARRAY['Swift', 'SwiftUI', 'Watch Connectivity', 'Machine Learning'], '', 'https://github.com/Alas-Purwo/nyanting', 12),
('Pulse', 'iOS and watchOS app designed to empower women by providing them with a reliable tool to monitor their heart rates and send emergency notifications when necessary.', '/images/projects/pulse.png', ARRAY['All', 'Mobile'], ARRAY['Swift', 'SwiftUI', 'UIKit', 'MVVM', 'HealthKit', 'MapKit', 'Firebase', 'Web Socket'], 'https://testflight.apple.com/join/FP5U793w', 'https://github.com/dinda-ayu-syafitri/MC3', 13),
('Don''t Slip', 'Game contains challenging task of keeping a penguin balanced on a constantly shifting iceberg. The player must use precise tilts and jumps to prevent the penguin from slipping off.', '/images/projects/penguin.png', ARRAY['All', 'Mobile'], ARRAY['Swift', 'SpriteKit', 'UIKit', 'MDA Framework'], 'https://testflight.apple.com/join/bNmofhv9', 'https://github.com/althafnafi/dont-slip', 14),
('iAm Notes', 'iAm is designed to help users log their emotions and thoughts in a structured and meaningful way. The core idea is simple: allow users to log notes based on their emotions.', '/images/projects/iam.png', ARRAY['All', 'Mobile'], ARRAY['Swift', 'SwiftUI', 'SwiftData', 'MVVM'], 'https://testflight.apple.com/join/6E212fbe', 'https://github.com/danieliank/iAm', 15),
('Protake', 'Designed to help users monitor and log their daily protein intake, with a recommended goal of up to 100 grams of protein per day to support muscle growth.', '/images/projects/protake.png', ARRAY['All', 'Mobile'], ARRAY['Swift', 'SwiftUI', 'SwiftData'], 'https://github.com/giventusmvh/ProteinIntake.git', 'https://github.com/giventusmvh/ProteinIntake.git', 16),
('Pitch Match', 'PitchMatch will analyze your voice, using the help of Apple Audio technology, SpeechKit and Machine Learning, then displaying the result as a score for you.', '/images/projects/pitchmatch.png', ARRAY['All', 'Mobile'], ARRAY['Swift', 'SwiftUI', 'AVFoundation', 'MVVM'], 'https://testflight.apple.com/join/hXoNS9l0', 'https://github.com/PitchMatch-ADA/PitchMatch-App', 17),
('GitHub Followers', 'App to see github followers of a selected user. Built programmatically with UIKit, tried to implement iOS development best practices, some of the code still have comments for learning purposes.', '/images/projects/ghfollowers.png', ARRAY['All', 'Mobile'], ARRAY['Swift', 'UIKit', 'AVFoundation', 'MVC'], '-', 'https://github.com/giventusmvh/GitHubFollowers', 18),
('PokeDex', 'An app that displayed up to third gen pokemon using pokemon api', '/images/projects/pokedex3.png', ARRAY['All', 'Mobile'], ARRAY['Swift', 'SwiftUI', 'Core Data', 'MVVM'], '-', 'https://github.com/giventusmvh/PokeDex3', 19),
('Crypto Indicators Bot', 'Discord bot with crypto indicators based on CMP, RSI, EMA, Delta, Liquidity, and Trend Bias. I create this using python with binance APIs, pandas, and numpy. This project is private because i use my own binance secret key to create this project.', '/images/projects/botcrypto.png', ARRAY['All', 'Python'], ARRAY['Python'], '-', '-', 20),
('Macroverse Web Design', 'Macroverse is an information media for finance, crypto, and forex. This is the website design i make for Macroverse. Already got responsive design for both desktop and mobile.', '/images/projects/macroversecover.png', ARRAY['All', 'UI/UX Design'], ARRAY['Figma'], 'https://www.figma.com/design/M3JjPoEHXdUpjxSiqi5yIu/Macroverse?node-id=24-1422&t=9uChZPpPoEZnodlN-1', '-', 21),
('ShopEase Web Design', 'ShopEase is a fictional e-commerce, I create this design using figma with modern e-commerce design in mind.', '/images/projects/shopeasecover.png', ARRAY['All', 'UI/UX Design'], ARRAY['Figma'], 'https://www.figma.com/design/o11H0BcP2EVsfNoGn8F0Vv/E-Commerce-Landing-Page?node-id=3-224&t=Je9Z9ELZ1us9zUQu-1', '-', 22),
('FaithMind App Design', 'FaithMind is a gamified app to encourage user to do more Bible reading, I conduct this design by research first, the research flow is available on the figma page.', '/images/projects/faithmindcover.png', ARRAY['All', 'UI/UX Design'], ARRAY['Figma'], 'https://www.figma.com/design/VleBX3HzieVCE7fJ1WK9il/FaithMind---Gamified-Bible-Reading-App?node-id=0-1&t=dVrIcsZqNeRok0k3-1', '-', 23),
('Ehefin Website', 'Ehefin adalah Sebuah ekosistem Electronic Holistic Evaluation Financing (EHEFIN) yang terpadu, menghubungkan aplikasi pengajuan nasabah dengan dasbor verifikasi internal dalam platform yang aman dan scalable.', '/images/projects/ehefin-website.png', ARRAY['All', 'Web'], ARRAY['Angular', 'TailwindCSS', 'Typescript', 'Firebase'], 'https://ehefin-fe.vercel.app/', 'https://github.com/giventusmvh/ehefin-fe.git', 24),
('Ehefin Mobile', 'Mengotomatisasi seluruh siklus kredit, dari pengajuan instan di sisi nasabah hingga persetujuan berjenjang (multi-level approval) yang ketat di sisi internal untuk memastikan pencairan dana yang cepat namun tetap akuntabel dan minim risiko.', '/images/projects/ehefin-mobile.png', ARRAY['All', 'Mobile'], ARRAY['Kotlin', 'RoomDB', 'Jetpact Compose', 'Firebase'], 'https://drive.google.com/file/d/1Ke3Kf7xww4Cj-P-9HaB56cI1tkd8QSz5/view?usp=sharing', 'https://github.com/giventusmvh/ehefinmobile.git', 25);
