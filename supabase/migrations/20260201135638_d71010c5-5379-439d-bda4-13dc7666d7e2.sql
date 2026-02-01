-- Create role enum
CREATE TYPE public.app_role AS ENUM ('citizen', 'employee', 'admin');

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'citizen',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    first_name TEXT,
    middle_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    date_of_birth DATE,
    gender TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.profiles
FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create complaint_categories table
CREATE TABLE public.complaint_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    icon TEXT,
    description TEXT,
    subcategories JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.complaint_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories" ON public.complaint_categories
FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON public.complaint_categories
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create complaints table
CREATE TABLE public.complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES public.complaint_categories(id),
    subcategory TEXT,
    title TEXT NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    reason TEXT[],
    photo_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
    assigned_employee_id UUID REFERENCES auth.users(id),
    zone TEXT,
    latitude DECIMAL,
    longitude DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Citizens can view their own complaints" ON public.complaints
FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'employee') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Citizens can create complaints" ON public.complaints
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Citizens can update their own complaints" ON public.complaints
FOR UPDATE USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'employee') OR public.has_role(auth.uid(), 'admin'));

-- Create employees table
CREATE TABLE public.employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    employee_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    job TEXT NOT NULL,
    age INTEGER,
    zone TEXT NOT NULL,
    main_area TEXT,
    photo_url TEXT,
    rating DECIMAL DEFAULT 0,
    total_ratings INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view employees" ON public.employees
FOR SELECT USING (true);

CREATE POLICY "Admins can manage employees" ON public.employees
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create employee_encouragements table
CREATE TABLE public.employee_encouragements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    description TEXT,
    username TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, employee_id)
);

ALTER TABLE public.employee_encouragements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view encouragements" ON public.employee_encouragements
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can add encouragement" ON public.employee_encouragements
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own encouragement" ON public.employee_encouragements
FOR UPDATE USING (auth.uid() = user_id);

-- Create events table
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    organizer TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    venue TEXT NOT NULL,
    category TEXT,
    poster_url TEXT,
    max_participants INTEGER,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved events" ON public.events
FOR SELECT USING (is_approved = true OR auth.uid() = created_by OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can create events" ON public.events
FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own events" ON public.events
FOR UPDATE USING (auth.uid() = created_by OR public.has_role(auth.uid(), 'admin'));

-- Create event_registrations table
CREATE TABLE public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, event_id)
);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own registrations" ON public.event_registrations
FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can register for events" ON public.event_registrations
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their registration" ON public.event_registrations
FOR DELETE USING (auth.uid() = user_id);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view messages" ON public.contact_messages
FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON public.complaints
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default complaint categories
INSERT INTO public.complaint_categories (name, icon, description, subcategories) VALUES
('Public Toilets & Sanitation', 'toilet', 'Issues related to public toilets and sanitation facilities', '["Yellow Spot (Public Urination Spot)", "No Electricity in Public Toilet", "No Water Supply in Public Toilet", "Public Toilet Blockage", "Open Defecation"]'),
('Waste & Garbage Management', 'trash-2', 'Issues related to waste collection and garbage management', '["Garbage Overflow", "Missed Pickup", "Improper Disposal", "Littering", "Garbage Burning"]'),
('Drainage & Sewerage Issues', 'droplets', 'Issues related to drainage and sewerage systems', '["Blocked Drain", "Overflowing Sewage", "Broken Manhole", "Stagnant Water", "Foul Smell"]'),
('Construction & Debris', 'construction', 'Issues related to construction waste and debris', '["Unauthorized Dumping", "Construction Waste", "Road Debris", "Building Material Blocking"]'),
('Street Cleaning / Sweeping', 'sparkles', 'Issues related to street cleanliness', '["Unswept Streets", "Dirty Public Spaces", "Leaf Accumulation", "Market Area Cleaning"]'),
('Septic Tank Issues', 'cylinder', 'Issues related to septic tanks', '["Septic Tank Overflow", "Cleaning Request", "Leakage", "Bad Odor"]');

-- Insert sample employees
INSERT INTO public.employees (employee_id, name, job, age, zone, main_area, rating, total_ratings) VALUES
('Emp0245824', 'Rajesh Sharma', 'Truck Driver', 25, 'Nehru Nagar', 'Sanjay Nagar, Hasanbag Police Chowki', 4.5, 120),
('Emp0245820', 'Herolal Honda', 'Sweeper', 30, 'Nehru Nagar', 'Civil Lines', 4.2, 85),
('Emp0245822', 'Saurabh Desai', 'Garbage Collector', 48, 'Nehru Nagar', 'Dharampeth', 4.8, 200),
('Emp0245821', 'Ramakant Pandey', 'Truck Driver', 33, 'Nehru Nagar', 'Sitabuldi', 4.0, 95),
('Emp0245825', 'Amit Kumar', 'Supervisor', 40, 'Dhantoli', 'Main Market Area', 4.6, 150),
('Emp0245826', 'Priya Meshram', 'Sanitation Worker', 28, 'Dharampeth', 'Law College Square', 4.3, 75);