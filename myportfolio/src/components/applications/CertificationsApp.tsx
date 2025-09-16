import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { SafariBrowser } from '../SafariBrowser';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  imageUrl: string;
  thumbnailUrl: string;
  verificationUrl?: string;
}

interface BrowserTab {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  isActive: boolean;
}

// Sample certifications data - replace with your actual certifications
const sampleCertifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'Oracle Cloud Infrastructure AI Foundations',
    issuer: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    imageUrl: '/cert1.png', // Image from public folder
    thumbnailUrl: '/cert1.png', // Same for thumbnail
    verificationUrl: 'https://drive.google.com/file/d/1MQClyJB_BUIIVFwETiQIA2T32YZuCBOL/view?usp=sharing'
  },
  {
    id: 'cert-2',
    title: 'AWS ML Foundations',
    issuer: 'AWS ML Foundations',
    imageUrl: '/cert2.png', // Replace with actual certificate image
    thumbnailUrl: '/cert2.png', // Replace with actual thumbnail
    verificationUrl: 'https://www.credly.com/badges/0ffafb5b-6391-4a21-9fac-0f098c09ae33/public_url'
  },
  {
    id: 'cert-3',
    title: 'AWS Educate Introduction to Generative AI',
    issuer: 'Amazon',
    imageUrl: '/cert3.png', // Replace with actual certificate image
    thumbnailUrl: '/cert3.png', // Replace with actual thumbnail
    verificationUrl: 'https://www.credly.com/badges/3af4cf58-3548-44a9-98f9-b9334c7023fa/public_url'
  },
  {
    id: 'cert-4',
    title: 'Deloitte Technology Virtual Internship',
    issuer: 'Deloitte',
    imageUrl: '/cert4.png', // Replace with actual certificate image
    thumbnailUrl: '/cert4.png', // Replace with actual thumbnail
    verificationUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_uJqdtugTYiH5DbEiZ_1748887990805_completion_certificate.pdf'
  }
];

export const CertificationsApp = () => {
  const [browserOpen, setBrowserOpen] = useState(false);
  const [tabs, setTabs] = useState<BrowserTab[]>([]);

  const openCertificationInBrowser = (certification: Certification) => {
    const existingTabIndex = tabs.findIndex(tab => tab.id === certification.id);
    
    if (existingTabIndex !== -1) {
      // Tab already exists, just activate it
      setTabs(prev => prev.map((tab, index) => ({
        ...tab,
        isActive: index === existingTabIndex
      })));
    } else {
      // Create new tab
      const newTab: BrowserTab = {
        id: certification.id,
        title: certification.title,
        url: certification.verificationUrl || `certification://${certification.id}`,
        imageUrl: certification.imageUrl,
        isActive: true
      };
      
      setTabs(prev => [
        ...prev.map(tab => ({ ...tab, isActive: false })),
        newTab
      ]);
    }
    
    setBrowserOpen(true);
  };

  const handleTabChange = (tabId: string) => {
    setTabs(prev => prev.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    })));
  };

  const handleTabClose = (tabId: string) => {
    setTabs(prev => {
      const filteredTabs = prev.filter(tab => tab.id !== tabId);
      
      // If we're closing the active tab, activate another one
      if (prev.find(tab => tab.id === tabId)?.isActive && filteredTabs.length > 0) {
        filteredTabs[filteredTabs.length - 1].isActive = true;
      }
      
      // If no tabs left, close browser
      if (filteredTabs.length === 0) {
        setBrowserOpen(false);
      }
      
      return filteredTabs;
    });
  };

  const handleBrowserClose = () => {
    setBrowserOpen(false);
    setTabs([]);
  };

  const handleHomeClick = () => {
    // Close the browser and return to desktop
    setBrowserOpen(false);
    setTabs([]);
  };

  return (
    <>
      <div className="h-full p-6">
        <h2 className="text-2xl font-bold mb-4">Certifications</h2>

        {/* Top: Safari-like pinned icons area with clickable certifications */}
        <div className="glass-bg p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3">Pinned Certifications</h3>
          <div className="flex items-center gap-4 overflow-x-auto">
            {sampleCertifications.map((cert) => (
              <div
                key={cert.id}
                className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg"
                onClick={() => openCertificationInBrowser(cert)}
                title={`${cert.title} - ${cert.issuer}`}
              >
                <div className="text-white text-center p-2">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="text-xs font-medium truncate">{cert.issuer.split(' ')[0]}</div>
                </div>
              </div>
            ))}
            
            {/* Add more certification slots */}
            <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-center text-gray-500">
                <div className="text-2xl mb-1">+</div>
                <div className="text-xs">Add Cert</div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleCertifications.map((cert) => (
            <div
              key={cert.id}
              className="glass-hover p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => openCertificationInBrowser(cert)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{cert.title}</h4>
                  <p className="text-xs opacity-80 mb-2">{cert.issuer}</p>
                  {cert.verificationUrl && (
                    <div className="flex items-center space-x-1 text-xs text-blue-500">
                      <ExternalLink size={12} />
                      <span>Verify</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2 opacity-60">
          <p className="text-sm">Click on any certification to view it in a Safari-like browser interface.</p>
          <p className="text-xs">Multiple certifications will open as separate tabs in the same browser window.</p>
        </div>
      </div>

      {/* Safari Browser Modal */}
      <SafariBrowser
        isOpen={browserOpen}
        onClose={handleBrowserClose}
        tabs={tabs}
        onTabChange={handleTabChange}
        onTabClose={handleTabClose}
        onHomeClick={handleHomeClick}
      />
    </>
  );
};
