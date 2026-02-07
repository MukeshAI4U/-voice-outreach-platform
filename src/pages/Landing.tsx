import { Link } from "react-router-dom";
import { Mic, CheckCircle, Phone, ArrowRight, Activity, Shield } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              <Mic className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">VoiceReach AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-primary">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary">How it Works</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary">Pricing</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/auth?view=signin" className="text-sm font-medium hover:text-primary">Sign In</Link>
            <Link to="/auth?view=signup" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6">
            New: Multi-language Support 🌍
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Automate Your Outbound Calls with <span className="text-primary">AI Voice Agents</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Upload your contacts, set your script, and let our human-like AI agents handle the calls one by one. Scale your outreach without hiring a call center.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth?view=signup" className="w-full sm:w-auto bg-primary text-primary-foreground h-12 px-8 rounded-md flex items-center justify-center font-medium text-lg hover:bg-primary/90">
              Start Calling Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a href="#demo" className="w-full sm:w-auto border border-input bg-background h-12 px-8 rounded-md flex items-center justify-center font-medium text-lg hover:bg-accent hover:text-accent-foreground">
              Listen to Demo
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose VoiceReach AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Phone className="h-8 w-8 text-primary" />,
                title: "Human-Like Conversations",
                desc: "Our AI agents pause, listen, and respond naturally with <500ms latency."
              },
              {
                icon: <Activity className="h-8 w-8 text-primary" />,
                title: "Real-time Analytics",
                desc: "Track call duration, outcomes, and get full transcripts instantly."
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Compliance First",
                desc: "Built-in rate limiting and DNC (Do Not Call) list management."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-background p-8 rounded-xl border shadow-sm">
                <div className="mb-4 bg-primary/10 w-fit p-3 rounded-lg">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-muted-foreground mb-16">No hidden fees. Cancel anytime.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Basic", price: "$10", calls: "50 Calls/mo", features: ["Standard Voices", "Basic Analytics", "Email Support"] },
              { name: "Starter", price: "$20", calls: "100 Calls/mo", features: ["Premium Voices", "Call Recordings", "Priority Support"], popular: true },
              { name: "Growth", price: "$50", calls: "250 Calls/mo", features: ["Custom Scripts", "API Access", "Dedicated Manager"] }
            ].map((plan, i) => (
              <div key={i} className={`relative bg-background rounded-xl border p-8 ${plan.popular ? 'ring-2 ring-primary shadow-lg' : 'shadow-sm'}`}>
                {plan.popular && (
                  <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-semibold">{plan.calls}</span>
                  </li>
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary/40 mr-2" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/auth?view=signup" className={`w-full h-10 flex items-center justify-center rounded-md font-medium ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-secondary/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Mic className="h-5 w-5 text-primary" />
            <span className="font-bold">VoiceReach AI</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VoiceReach AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
