#!/bin/bash

# Create Missing NSSF MVP Structure
echo "📁 Creating missing directories and files..."

# Create necessary directories
mkdir -p src/store
mkdir -p src/components/layout
mkdir -p src/app/login
mkdir -p src/app/dashboard

echo "✅ Directories created!"

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    cat << 'EOF' > .env.local
# Replace with your actual Supabase project details
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
EOF
    echo "📝 Created .env.local template"
else
    echo "📝 .env.local already exists"
fi

# Add missing shadcn components
echo "📦 Adding missing shadcn components..."
npx shadcn@latest add alert --yes 2>/dev/null || echo "Alert component may already exist"

echo "✅ Missing structure created!"
echo ""
echo "🚀 Next steps:"
echo "1. Copy the code from each artifact into the corresponding file"
echo "2. Set up your Supabase project and add credentials to .env.local"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "📂 Your final structure should look like:"
echo "src/"
echo "├── app/"
echo "│   ├── dashboard/"
echo "│   │   └── page.tsx"
echo "│   ├── login/"
echo "│   │   └── page.tsx"
echo "│   ├── register/"
echo "│   │   └── page.tsx"
echo "│   ├── globals.css"
echo "│   ├── layout.tsx"
echo "│   └── page.tsx"
echo "├── components/"
echo "│   ├── layout/"
echo "│   │   └── dashboard-layout.tsx"
echo "│   └── ui/"
echo "│       ├── alert.tsx"
echo "│       └── [other shadcn components]"
echo "├── lib/"
echo "│   ├── supabase.ts"
echo "│   └── utils.ts"
echo "└── store/"
echo "    └── auth-store.ts"