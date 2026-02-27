# Prime Route - AI Career Copilot

A premium AI-powered web application designed to help users elevate their careers with intelligent, personalized guidance. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and OpenAI.

## Features

### 1. **Resume Analyzer**
Get AI-powered feedback on your resume with detailed suggestions for improvement. Upload your resume in PDF, DOCX, or TXT format and receive:
- Overall quality score
- Strengths and weaknesses
- Specific improvement suggestions
- Industry best practices

### 2. **Coding Assistant**
Solve coding problems with AI guidance. Ask questions, share code snippets, and get:
- Hints and explanations
- Complete solutions with explanations
- Code optimization suggestions
- Best practices and patterns

### 3. **Learning Roadmap Generator**
Create personalized learning paths for any skill. Specify your goal and current level to get:
- Structured learning curriculum
- Recommended resources
- Time estimates for each milestone
- Progress tracking suggestions

### 4. **Project Recommender**
Discover projects that match your skill level and interests:
- AI-curated project suggestions
- Difficulty and time estimates
- Skill-building potential analysis
- Step-by-step guidance for implementation

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **AI Integration**: OpenAI API
- **UI Components**: Custom glass-morphism design system
- **File Processing**: PDF, DOCX, TXT support

## Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prime-route
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
prime-route/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── globals.css         # Global styles and design tokens
│   └── page.tsx            # Main landing page
├── components/
│   ├── glass-card.tsx      # Reusable glass-morphism card
│   ├── loading-state.tsx   # Loading animation component
│   ├── code-block.tsx      # Code display with syntax highlighting
│   ├── chat-message.tsx    # Chat message component
│   ├── file-upload.tsx     # File upload with validation
│   ├── feature-tabs.tsx    # Feature navigation tabs
│   └── features/
│       ├── resume-analyzer.tsx
│       ├── coding-assistant.tsx
│       ├── learning-roadmap.tsx
│       └── project-recommender.tsx
├── lib/
│   ├── ai-service.ts       # OpenAI integration layer
│   ├── file-utils.ts       # File processing utilities
│   ├── animations.ts       # Framer Motion animation presets
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript type definitions
├── public/                 # Static assets
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Key Components

### GlassCard
A reusable component with glass-morphism styling and animations:
```tsx
<GlassCard hover>
  <p>Your content here</p>
</GlassCard>
```

### FileUpload
Handle file uploads with validation:
```tsx
<FileUpload
  onFileSelect={handleFile}
  accept=".pdf,.docx,.txt"
  label="Upload Document"
/>
```

### LoadingState
Display loading animations with spinner:
```tsx
<LoadingState text="Processing..." />
```

### Badge
Display status badges with variants:
```tsx
<Badge variant="success" animated>Complete</Badge>
```

### Progress & StepIndicator
Track progress visually:
```tsx
<Progress value={75} label="Learning Progress" />
<StepIndicator steps={['Basics', 'Advanced', 'Expert']} currentStep={1} />
```

### Tooltip
Add helpful tooltips on hover:
```tsx
<Tooltip content="This is helpful info">
  <button>Hover me</button>
</Tooltip>
```

### ErrorBoundary
Handle errors gracefully:
```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## AI Service Integration

The app uses OpenAI's API for all AI features. The service layer handles:
- Resume analysis with detailed feedback
- Coding assistance with explanations
- Learning roadmap generation
- Project recommendations

### Mock Data Fallback
If the OpenAI API is unavailable, the app falls back to realistic mock data for development and testing.

## Design System

### Color Palette
- **Primary**: Blue (#1B5AFF)
- **Secondary**: Purple (#A855F7)
- **Accent**: Teal (#2DD4BF)
- **Background**: Dark charcoal (#1A1F2E)

### Typography
- **Sans**: Geist (headings and body)
- **Mono**: Geist Mono (code)

### Spacing & Sizing
- Border radius: 10px (0.625rem)
- Uses Tailwind's default spacing scale

## Animation System

The app uses Framer Motion for smooth, professional animations:

### Animation Presets (lib/animations.ts)
- `containerVariants`: Staggered container animations
- `itemVariants`: Fade and slide in effects
- `slideInVariants`: Horizontal slide animations
- `fadeInVariants`: Pure fade animations
- `scaleVariants`: Scale and fade combinations
- `pulseVariants`: Continuous pulse effects
- `shimmerVariants`: Shimmer loading effect
- `pageTransitionVariants`: Page enter/exit animations

### Component Animations
- **GlassCard**: Fade, slide, and scale on view
- **GlassButton**: Scale on hover and tap
- **LoadingState**: Animated spinner with bouncing dots
- **Progress**: Animated progress bar fill
- **StepIndicator**: Staggered step animations
- **ChatMessage**: Fade and slide with delays
- **CodeBlock**: Fade in on render

## Performance Features

- **Image Optimization**: Next.js Image component for automatic optimization
- **Code Splitting**: Dynamic imports for feature components
- **Animations**: GPU-accelerated Framer Motion animations
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Screen reader support
- Keyboard navigation ready
- High contrast ratios for readability

## Error Handling

All features include:
- Graceful error messages
- Input validation
- File type checking
- API error handling with user-friendly messages
- Fallback to mock data when needed

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Development

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Deployment

The app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the `OPENAI_API_KEY` environment variable in Vercel dashboard
4. Deploy!

## Future Enhancements

- Database integration for user accounts and history
- Resume templates and examples
- Interview preparation guide
- Salary negotiation assistant
- Career path comparison tool
- Real-time collaboration features

## Support

For issues or questions, please open an issue in the repository.

## License

MIT License - feel free to use this project for personal or commercial purposes.
