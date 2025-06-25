import React from 'react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between text-sm text-muted-foreground">
        <p>&copy; {currentYear} CaptureMetrics. All rights reserved.</p>
        <p>v1.0.0</p>
      </div>
    </footer>
  );
};

export default Footer;