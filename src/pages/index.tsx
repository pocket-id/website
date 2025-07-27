import {
  BookOpen,
  Code,
  Database,
  FileText,
  Globe,
  Mail,
  Palette,
  Shield,
  Smartphone,
  TestTubeDiagonal,
  UserPlus,
  Users,
} from 'lucide-react';
import { Icons } from '../components/icons';
import { useEffect, useState } from 'react';
import ConnectArrow from '../components/connect-arrow';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { getInstanceCount } from '../utils/instance-count';
import { readVersionFile } from '../version-label';
import GithubLink from '../components/github-link';

export default function Component() {
  const [instanceCount, setInstanceCount] = useState<number | undefined>();
  const [version, setVersion] = useState<string | undefined>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [instanceCountLoaded, setInstanceCountLoaded] = useState(false);

  useEffect(() => {
    getInstanceCount()
      .then((c) => {
        setInstanceCount(c);
        // Trigger instance count animation after a slight delay, for some reason it doesnt animation properly without a separate state.
        setTimeout(() => setInstanceCountLoaded(true), 100);
      })
      .catch();

    readVersionFile()
      .then((v) => setVersion(v))
      .catch();

    document.documentElement.setAttribute('data-theme', 'dark');

    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const fadeInUp = (delay = 0) => ({
    transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
    opacity: isLoaded ? 1 : 0,
    transition: `all 0.6s ease-out ${Math.min(delay, 200)}ms`,
  });

  const fadeIn = (delay = 0) => ({
    opacity: isLoaded ? 1 : 0,
    transition: `opacity 0.6s ease-out ${Math.min(delay, 200)}ms`,
  });

  const fadeInInstanceCount = (delay = 0) => ({
    transform: instanceCountLoaded ? 'translateY(0)' : 'translateY(30px)',
    opacity: instanceCountLoaded ? 1 : 0,
    transition: `all 0.6s ease-out ${Math.min(delay, 200)}ms`,
  });

  const mainFeatures = [
    {
      icon: Shield,
      title: 'Passwordless Authentication',
      description:
        'Pocket ID only supports passwordless authentication, which is easier and more secure than signing in with a password.',
      image: 'auth_screenshot.png',
    },
    {
      icon: Users,
      title: 'Restrict User Groups',
      description:
        'You can select which user groups are allowed to authenticate with your services. Fine-grained access control ensures only authorized users can access your applications.',
      image: 'group_restriction_screenshot.png',
    },
    {
      icon: Database,
      title: 'LDAP Integration',
      description: 'Sync your users and groups from your LDAP server to Pocket ID.',
      image: 'ldap_screenshot.png',
    },
    {
      icon: Code,
      title: 'REST API',
      description:
        'We have a documented REST API which allows you to create integrations. Build custom workflows and automate user management with our API.',
      image: 'rest_api_screenshot.png',
    },
    {
      icon: UserPlus,
      title: 'Flexible User Registration',
      description:
        "The admin can either create users manually, create sign up links, or allow open registration. Choose the registration method that fits your organization's needs.",
      image: 'registration_screenshot.png',
    },
  ];

  const additionalFeatures = [
    {
      icon: Smartphone,
      title: 'Login Code',
      description:
        "Create a one-time login code to sign in from a different device when you don't have your passkey available.",
    },
    {
      icon: Globe,
      title: '10+ Languages',
      description:
        'The community has translated Pocket ID into over 10 languages. More translations are always welcome!',
    },
    {
      icon: Palette,
      title: 'Dark & Light Mode',
      description: 'Pocket ID matches your system theme, whether you prefer dark or light mode.',
    },
    {
      icon: FileText,
      title: 'Audit Logs',
      description: 'Comprehensive audit logs for important events, both global and per user.',
    },
    {
      icon: Mail,
      title: 'Mail Notifications',
      description: 'Automatic email notifications for sign-ins from unknown devices.',
    },
    {
      icon: Shield,
      title: 'Self-Hosted',
      description: 'Complete control over your authentication infrastructure with self-hosting.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white" data-theme="dark">
      <header className="border-b border-border bg-black/50 backdrop-blur-sm sticky top-0 z-50" style={fadeIn(0)}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/img/logo.png" alt="Pocket ID Logo" className="mr-3 h-8 w-8" />
            <span className="text-xl font-bold">Pocket ID</span>
            {version && (
              <Badge variant="outline" className="hidden sm:block">
                v{version}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button asChild>
              <a href="/docs" className="no-underline">
                <BookOpen className="w-5 h-5" />
                <span className="ml-1 hidden sm:flex">Documentation</span>
              </a>
            </Button>
            <GithubLink />
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-playfair"
            style={fadeInUp(50)}
          >
            Pocket ID
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed" style={fadeInUp(100)}>
            A simple and easy-to-use OIDC provider that allows users to authenticate with their passkeys to your
            services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={fadeInUp(150)}>
            <Button size="lg" asChild>
              <a href="/docs" className="no-underline">
                <BookOpen className="w-5 h-5 mr-2" />
                Documentation
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-white" asChild>
              <a target="_blank" href="https://demo.pocket-id.org" className="no-underline">
                <TestTubeDiagonal className="w-5 h-5 mr-1" /> Demo
              </a>
            </Button>
          </div>
          {instanceCount && (
            <Badge variant="outline" className="mt-6" style={fadeInInstanceCount(200)}>
              <div className="bg-green-400 rounded-full w-2 h-2 animate-pulse inline-block mr-1"></div>
              {instanceCount} Active Instances
            </Badge>
          )}
        </div>
      </section>

      <section id="features" className="pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <div
            className="text-center mb-16"
            style={fadeInUp(50)} // Reduced from 200
          >
            <h2 className="text-4xl font-bold mb-4 font-playfair">Key Features</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need for modern authentication in one simple package
            </p>
          </div>

          <div className="grid gap-12 max-w-6xl mx-auto">
            {mainFeatures.map((feature, index) => {
              const imageFirst = index % 2 === 0;
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="grid md:grid-cols-2 gap-8 items-center"
                  style={fadeInUp(100 + index * 20)}
                >
                  <div className={`${imageFirst ? 'md:order-2' : ''}`}>
                    <div className="flex items-center mb-4">
                      <IconComponent className="w-8 h-8 text-white mr-3" />
                      <h3 className="text-2xl font-bold mb-0">{feature.title}</h3>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                  </div>
                  <div className={`bg-card rounded-lg p-4 border border-border ${imageFirst ? 'md:order-1' : ''}`}>
                    <img src={`/img/landing/${feature.image}`} alt={feature.title} className="rounded-lg w-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="flex flex-col items-center py-16" style={fadeIn(150)}>
          <ConnectArrow className="h-12 rotate-90 mx-auto mb-8 text-gray-400" />
        </div>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="bg-card border-border hover:border-gray-600 transition-all duration-300"
                  style={fadeInUp(100 + index * 15)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <IconComponent className="w-6 h-6 text-white" />
                      <CardTitle className="text-white">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl" style={fadeInUp(150)}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">Ready to get started?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Deploy Pocket ID today and start providing secure, passwordless authentication to your users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/docs" className="no-underline">
                <BookOpen className="w-5 h-5 mr-1" />
                Read Documentation
              </a>
            </Button>
            <Button className="text-white" size="lg" variant="outline" asChild>
              <a href="https://github.com/pocket-id/pocket-id" target="_blank" className="no-underline">
                <Icons.gitHub className="mr-1 size-5" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
