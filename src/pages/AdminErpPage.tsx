import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Calendar as CalendarIcon,
  Users,
  Database,
  Send,
  Phone,
  Plus,
  Search,
  CheckCircle2,
  ArrowLeft,
  Menu,
  X,
  MapPin,
  Building2,
  Pause,
  Play,
  RefreshCw,
  ArrowRight,
  Clock,
  MessageSquare,
  Mail,
  ChevronLeft,
} from 'lucide-react';
import {
  HomeownerRecord,
  OutreachCampaign,
  ErpLeadItem,
  LeadStage,
  RoutePath,
} from '../types';
import {
  DATABASE_CITY_BREAKDOWN,
  INITIAL_HOMEOWNER_RECORDS,
  INITIAL_CAMPAIGNS,
  loadErpLeads,
  saveErpLeads,
} from '../data/erpData';

interface AdminErpPageProps {
  onNavigate: (path: RoutePath) => void;
}

type ErpSection = 'dashboard' | 'inbox' | 'calendar' | 'leads' | 'vault' | 'campaigns';

interface InboxMessage {
  id: string;
  sender: 'homeowner' | 'don';
  text: string;
  timestamp: string;
}

interface InboxThread {
  id: string;
  homeownerName: string;
  city: string;
  address: string;
  phone: string;
  channel: 'SMS Reply' | 'Email Reply' | 'Website Inquiry';
  unread: boolean;
  lastTime: string;
  messages: InboxMessage[];
}

interface ServiceAppointment {
  id: string;
  dayOfMonth: number; // e.g. 11, 12, 13, 14, 15...
  dateLabel: string;
  timeSlot: string;
  homeownerName: string;
  city: string;
  address: string;
  phone: string;
  serviceType: 'Don — Moisture & Mold Inspection' | 'Mold Trust Crew — Remediation & Encapsulation' | 'Don — Pre-Listing Broker Walk';
  notes: string;
}

const INITIAL_INBOX_THREADS: InboxThread[] = [
  {
    id: 'MSG-101',
    homeownerName: 'Robert & Linda Thornton',
    city: 'Cumming',
    address: '4120 Polo Club Dr',
    phone: '(770) 555-0148',
    channel: 'SMS Reply',
    unread: true,
    lastTime: '10:15 AM',
    messages: [
      {
        id: 'm1',
        sender: 'don',
        text: 'Hi Robert, I’m Don Helvey—a 30-year GA Real Estate Broker & Certified Mold Inspector here in Forsyth County. Homes built around 1998 in Polo Club with vented crawl spaces are seeing high subfloor humidity this month. Let me know if you’d like a quick, honest moisture check.',
        timestamp: 'Yesterday, 2:10 PM',
      },
      {
        id: 'm2',
        sender: 'homeowner',
        text: 'Hi Don, glad you texted. We actually noticed our dining room hardwood planks cupping slightly and a musty odor when the AC kicks on. Are you in Cumming this week?',
        timestamp: 'Today, 10:15 AM',
      },
    ],
  },
  {
    id: 'MSG-102',
    homeownerName: 'Steven & Laura Reynolds',
    city: 'Dawsonville',
    address: '445 Gold Creek Trail',
    phone: '(706) 555-0881',
    channel: 'SMS Reply',
    unread: true,
    lastTime: '9:05 AM',
    messages: [
      {
        id: 'm1',
        sender: 'don',
        text: 'Hi Steven, Don Helvey here (Licensed GA Broker & Certified Mold Specialist). With lake-corridor humidity spiking in Dawsonville, reply "CHECK" if you’d like me to take an honest look at your crawl space.',
        timestamp: 'Yesterday, 4:00 PM',
      },
      {
        id: 'm2',
        sender: 'homeowner',
        text: 'CHECK — I was down in the crawl space changing the dehumidifier filter and saw white/gray spots on the floor joists. Can you call me this afternoon?',
        timestamp: 'Today, 9:05 AM',
      },
    ],
  },
  {
    id: 'MSG-103',
    homeownerName: 'Catherine Vance',
    city: 'Alpharetta',
    address: '1185 Windward Concourse',
    phone: '(678) 555-0291',
    channel: 'Email Reply',
    unread: true,
    lastTime: 'Yesterday',
    messages: [
      {
        id: 'm1',
        sender: 'homeowner',
        text: 'Hello Don, we are listing our Windward home in 3 weeks and our agent suggested having you inspect our basement utility room before the buyer’s inspector flags it. Do you have Thursday morning open?',
        timestamp: 'Yesterday, 4:30 PM',
      },
      {
        id: 'm2',
        sender: 'don',
        text: 'Hi Catherine, I would be happy to walk the basement with you. As a 30-year broker, I know exactly what home inspectors look for and how to resolve it cleanly with Mold Trust if needed.',
        timestamp: 'Yesterday, 5:05 PM',
      },
    ],
  },
  {
    id: 'MSG-104',
    homeownerName: 'Michael & Claire Henderson',
    city: 'Johns Creek',
    address: '2190 Chattahoochee Landing',
    phone: '(770) 555-0644',
    channel: 'Website Inquiry',
    unread: false,
    lastTime: '2 days ago',
    messages: [
      {
        id: 'm1',
        sender: 'homeowner',
        text: 'Submitted Website Form: Crawl Space Concerns. Looking for a full moisture reading and encapsulation quote in Johns Creek.',
        timestamp: '2 days ago',
      },
      {
        id: 'm2',
        sender: 'don',
        text: 'Confirmed for Wednesday at 2:00 PM. See you then, Michael!',
        timestamp: '2 days ago',
      },
    ],
  },
  {
    id: 'MSG-105',
    homeownerName: 'Paul & Rebecca Abernathy',
    city: 'Canton',
    address: '780 Sixes Rd',
    phone: '(770) 555-0199',
    channel: 'SMS Reply',
    unread: false,
    lastTime: '2 days ago',
    messages: [
      {
        id: 'm1',
        sender: 'homeowner',
        text: 'Hi Don, we got your Cherokee County message. Can you check both crawl space humidity and radon when you come out Friday?',
        timestamp: '2 days ago',
      },
      {
        id: 'm2',
        sender: 'don',
        text: 'Absolutely Paul. I am certified in both mold/moisture inspection and radon screening. I’ll bring my hygrometer, pin meter, and radon monitor on Friday at 10:30 AM.',
        timestamp: '2 days ago',
      },
    ],
  },
  {
    id: 'MSG-106',
    homeownerName: 'Harrison & Evelyn Grant',
    city: 'Cumming',
    address: '3810 Windermere Pkwy',
    phone: '(770) 555-0782',
    channel: 'Email Reply',
    unread: false,
    lastTime: '3 days ago',
    messages: [
      {
        id: 'm1',
        sender: 'homeowner',
        text: 'Don, thank you for walking us through the crawl space readings yesterday. We just signed the Mold Trust encapsulation proposal for Wednesday!',
        timestamp: '3 days ago',
      },
      {
        id: 'm2',
        sender: 'don',
        text: 'Wonderful news, Harrison! The Mold Trust crew will take great care of your home on Wednesday morning.',
        timestamp: '3 days ago',
      },
    ],
  },
];

const INITIAL_APPOINTMENTS: ServiceAppointment[] = [
  {
    id: 'APT-1',
    dayOfMonth: 10,
    dateLabel: 'Tue, Nov 10',
    timeSlot: '10:00 AM – 11:30 AM',
    homeownerName: 'Robert & Linda Thornton',
    city: 'Cumming',
    address: '4120 Polo Club Dr',
    phone: '(770) 555-0148',
    serviceType: 'Don — Moisture & Mold Inspection',
    notes: 'Check dining room subfloor WME % and crawl space relative humidity.',
  },
  {
    id: 'APT-2',
    dayOfMonth: 10,
    dateLabel: 'Tue, Nov 10',
    timeSlot: '2:00 PM – 3:30 PM',
    homeownerName: 'Steven & Laura Reynolds',
    city: 'Dawsonville',
    address: '445 Gold Creek Trail',
    phone: '(706) 555-0881',
    serviceType: 'Don — Moisture & Mold Inspection',
    notes: 'Inspect white fungal growth on pine joists; prepare Mold Trust scope.',
  },
  {
    id: 'APT-3',
    dayOfMonth: 11,
    dateLabel: 'Wed, Nov 11',
    timeSlot: '9:00 AM – 4:00 PM',
    homeownerName: 'Harrison & Evelyn Grant',
    city: 'Cumming',
    address: '3810 Windermere Pkwy',
    phone: '(770) 555-0782',
    serviceType: 'Mold Trust Crew — Remediation & Encapsulation',
    notes: 'Mold Trust crew on-site for 20-mil encapsulation & HEPA joist sanding ($6,850 job).',
  },
  {
    id: 'APT-4',
    dayOfMonth: 11,
    dateLabel: 'Wed, Nov 11',
    timeSlot: '2:00 PM – 3:30 PM',
    homeownerName: 'Michael & Claire Henderson',
    city: 'Johns Creek',
    address: '2190 Chattahoochee Landing',
    phone: '(770) 555-0644',
    serviceType: 'Don — Moisture & Mold Inspection',
    notes: 'Referred by KW agent. Full crawl space hygrometer mapping.',
  },
  {
    id: 'APT-5',
    dayOfMonth: 12,
    dateLabel: 'Thu, Nov 12',
    timeSlot: '10:30 AM – 12:00 PM',
    homeownerName: 'Catherine Vance',
    city: 'Alpharetta',
    address: '1185 Windward Concourse',
    phone: '(678) 555-0291',
    serviceType: 'Don — Pre-Listing Broker Walk',
    notes: 'Pre-sale basement inspection before listing goes live on MLS.',
  },
  {
    id: 'APT-6',
    dayOfMonth: 13,
    dateLabel: 'Fri, Nov 13',
    timeSlot: '10:30 AM – 12:00 PM',
    homeownerName: 'Paul & Rebecca Abernathy',
    city: 'Canton',
    address: '780 Sixes Rd',
    phone: '(770) 555-0199',
    serviceType: 'Don — Moisture & Mold Inspection',
    notes: 'Crawl space moisture evaluation + radon test placement.',
  },
  {
    id: 'APT-7',
    dayOfMonth: 14,
    dateLabel: 'Sat, Nov 14',
    timeSlot: '9:30 AM – 1:30 PM',
    homeownerName: 'Dr. Alan & Wendy Pruitt',
    city: 'Gainesville',
    address: '1405 Marina Bay Dr',
    phone: '(678) 555-0530',
    serviceType: 'Mold Trust Crew — Remediation & Encapsulation',
    notes: 'Mold Trust crew installing commercial dehumidifier & duct antimicrobial treatment.',
  },
  {
    id: 'APT-8',
    dayOfMonth: 17,
    dateLabel: 'Tue, Nov 17',
    timeSlot: '11:00 AM – 12:30 PM',
    homeownerName: 'William & Diane Prescott',
    city: 'Johns Creek',
    address: '9405 St Ives Country Club Pkwy',
    phone: '(770) 555-0922',
    serviceType: 'Don — Moisture & Mold Inspection',
    notes: 'Full crawl space hygrometer & wood moisture evaluation.',
  },
  {
    id: 'APT-9',
    dayOfMonth: 19,
    dateLabel: 'Thu, Nov 19',
    timeSlot: '9:00 AM – 3:00 PM',
    homeownerName: 'Robert & Linda Thornton',
    city: 'Cumming',
    address: '4120 Polo Club Dr',
    phone: '(770) 555-0148',
    serviceType: 'Mold Trust Crew — Remediation & Encapsulation',
    notes: 'Scheduled Mold Trust encapsulation installation follow-up.',
  },
  {
    id: 'APT-10',
    dayOfMonth: 24,
    dateLabel: 'Tue, Nov 24',
    timeSlot: '1:30 PM – 3:00 PM',
    homeownerName: 'Gregory & Patricia Miller',
    city: 'Gainesville',
    address: '2210 Lake Lanier Club Way',
    phone: '(770) 555-0612',
    serviceType: 'Don — Pre-Listing Broker Walk',
    notes: 'Lake Lanier waterfront basement & crawl space check.',
  },
];

const LEAD_STAGES: LeadStage[] = [
  'New Lead',
  'Spoke with Don',
  'Assessment Booked',
  'Sent to Mold Trust',
  'Completed',
];

export const AdminErpPage: React.FC<AdminErpPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<ErpSection>('dashboard');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [homeowners, setHomeowners] = useState<HomeownerRecord[]>(INITIAL_HOMEOWNER_RECORDS);
  const [campaigns, setCampaigns] = useState<OutreachCampaign[]>(INITIAL_CAMPAIGNS);
  const [leads, setLeads] = useState<ErpLeadItem[]>(() => loadErpLeads());

  // Inbox State
  const [threads, setThreads] = useState<InboxThread[]>(INITIAL_INBOX_THREADS);
  const [selectedThreadId, setSelectedThreadId] = useState<string>(INITIAL_INBOX_THREADS[0].id);
  const [mobileShowChatPane, setMobileShowChatPane] = useState<boolean>(false);
  const [replyDraft, setReplyDraft] = useState<string>('');

  // Calendar State
  const [appointments, setAppointments] = useState<ServiceAppointment[]>(INITIAL_APPOINTMENTS);
  const [selectedDay, setSelectedDay] = useState<number | 'All'>(10);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState<boolean>(false);
  const [aptName, setAptName] = useState('');
  const [aptCity, setAptCity] = useState('Cumming');
  const [aptAddress, setAptAddress] = useState('');
  const [aptPhone, setAptPhone] = useState('');
  const [aptDay, setAptDay] = useState<number>(12);
  const [aptTime, setAptTime] = useState('10:00 AM – 11:30 AM');
  const [aptType, setAptType] = useState<ServiceAppointment['serviceType']>(
    'Don — Moisture & Mold Inspection'
  );

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Leads Filter
  const [stageFilter, setStageFilter] = useState<LeadStage | 'All'>('All');

  // 250K Vault Simple Filters
  const [vaultCity, setVaultCity] = useState<string>('All');
  const [vaultFoundation, setVaultFoundation] = useState<string>('All');
  const [vaultSearch, setVaultSearch] = useState<string>('');

  // Modals
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [moldTrustModalLead, setMoldTrustModalLead] = useState<ErpLeadItem | null>(null);

  // New Lead Form
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadCity, setNewLeadCity] = useState('Cumming');
  const [newLeadConcern, setNewLeadConcern] = useState('Crawl Space Concerns');

  // Mold Trust Dispatch Form
  const [dispatchEstimate, setDispatchEstimate] = useState<number>(5400);
  const [dispatchRH, setDispatchRH] = useState<number>(70);
  const [dispatchScope, setDispatchScope] = useState<string>(
    'Crawl Space Remediation + Encapsulation'
  );

  // New Campaign Form
  const [newCampName, setNewCampName] = useState('');
  const [newCampCity, setNewCampCity] = useState('Cumming');
  const [newCampDaily, setNewCampDaily] = useState(500);

  const updateLeads = (updated: ErpLeadItem[]) => {
    setLeads(updated);
    saveErpLeads(updated);
  };

  // Core Numbers
  const stats = useMemo(() => {
    const totalContacted = campaigns.reduce((sum, c) => sum + c.sentCount, 0);
    const toCallCount = leads.filter(
      (l) => l.stage === 'New Lead' || l.stage === 'Spoke with Don'
    ).length;
    const unreadCount = threads.filter((t) => t.unread).length;
    const moldTrustLeads = leads.filter(
      (l) => l.stage === 'Sent to Mold Trust' || l.stage === 'Completed'
    );
    const moldTrustVolume = moldTrustLeads.reduce((sum, l) => sum + l.estimatedJobValue, 0);
    const donCommission = Math.round(moldTrustVolume * 0.15);

    return {
      totalContacted,
      toCallCount,
      unreadCount,
      moldTrustCount: moldTrustLeads.length,
      moldTrustVolume,
      donCommission,
    };
  }, [campaigns, leads, threads]);

  // Dynamic 250K Count
  const matchedHomeownerCount = useMemo(() => {
    let total = 250000;
    if (vaultCity !== 'All') {
      const cityObj = DATABASE_CITY_BREAKDOWN.find((c) => c.city === vaultCity);
      total = cityObj ? cityObj.totalHomes : 25000;
    }
    if (vaultFoundation === 'Crawl Space') total = Math.round(total * 0.46);
    if (vaultFoundation === 'Basement') total = Math.round(total * 0.31);
    if (vaultFoundation === 'Slab') total = Math.round(total * 0.23);
    return total;
  }, [vaultCity, vaultFoundation]);

  const filteredHomeowners = useMemo(() => {
    return homeowners.filter((h) => {
      if (vaultCity !== 'All' && h.city !== vaultCity) return false;
      if (vaultFoundation !== 'All' && h.foundation !== vaultFoundation) return false;
      if (vaultSearch.trim()) {
        const q = vaultSearch.toLowerCase();
        return (
          h.fullName.toLowerCase().includes(q) ||
          h.address.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [homeowners, vaultCity, vaultFoundation, vaultSearch]);

  const filteredLeads = useMemo(() => {
    if (stageFilter === 'All') return leads;
    return leads.filter((l) => l.stage === stageFilter);
  }, [leads, stageFilter]);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === selectedThreadId) || threads[0],
    [threads, selectedThreadId]
  );

  const handleSelectThread = (id: string) => {
    setSelectedThreadId(id);
    setMobileShowChatPane(true);
    setThreads((prev) => prev.map((t) => (t.id === id ? { ...t, unread: false } : t)));
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyDraft.trim() || !activeThread) return;

    const newMsg: InboxMessage = {
      id: `m-${Date.now()}`,
      sender: 'don',
      text: replyDraft.trim(),
      timestamp: 'Just Now',
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? { ...t, unread: false, lastTime: 'Just Now', messages: [...t.messages, newMsg] }
          : t
      )
    );
    setReplyDraft('');
    showToast(`Reply sent to ${activeThread.homeownerName}`);
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aptName.trim()) return;
    const dayLabels: Record<number, string> = {
      9: 'Mon, Nov 9',
      10: 'Tue, Nov 10',
      11: 'Wed, Nov 11',
      12: 'Thu, Nov 12',
      13: 'Fri, Nov 13',
      14: 'Sat, Nov 14',
      15: 'Sun, Nov 15',
    };
    const created: ServiceAppointment = {
      id: `APT-${Date.now()}`,
      dayOfMonth: aptDay,
      dateLabel: dayLabels[aptDay] || `Nov ${aptDay}`,
      timeSlot: aptTime,
      homeownerName: aptName.trim(),
      city: aptCity,
      address: aptAddress.trim() || `${aptCity} Property`,
      phone: aptPhone.trim() || '(770) 555-0199',
      serviceType: aptType,
      notes: 'Scheduled via Service Calendar.',
    };
    setAppointments((prev) => [...prev, created]);
    setSelectedDay(aptDay);
    setIsNewAppointmentOpen(false);
    setAptName('');
    setAptAddress('');
    setAptPhone('');
    showToast(`Scheduled appointment for ${created.homeownerName}`);
  };

  const handleStageChange = (leadId: string, nextStage: LeadStage) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, stage: nextStage } : l));
    updateLeads(updated);
    showToast(`Updated status to "${nextStage}"`);
  };

  const handleAddFromVault = (record: HomeownerRecord) => {
    if (leads.some((l) => l.fullName === record.fullName)) {
      showToast(`${record.fullName} is already in My Leads`);
      setActiveSection('leads');
      return;
    }
    const created: ErpLeadItem = {
      id: `LD-${Math.floor(910 + Math.random() * 890)}`,
      fullName: record.fullName,
      phone: record.phone,
      email: record.email,
      address: record.address,
      city: record.city,
      concernType: `${record.foundation} Moisture Check`,
      foundation: record.foundation,
      yearBuilt: record.yearBuilt,
      stage: 'New Lead',
      source: '250K Drip Reply',
      createdAt: 'Just Now',
      notes: `Added from 250K List (${record.address}, built ${record.yearBuilt}).`,
      estimatedJobValue: 4800,
      donCommissionRate: 0.15,
    };
    updateLeads([created, ...leads]);
    setHomeowners((prev) =>
      prev.map((h) => (h.id === record.id ? { ...h, outreachStatus: 'Replied (Lead)' } : h))
    );
    showToast(`Added ${record.fullName} to My Leads`);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadPhone.trim()) return;
    const created: ErpLeadItem = {
      id: `LD-${Math.floor(910 + Math.random() * 890)}`,
      fullName: newLeadName.trim(),
      phone: newLeadPhone.trim(),
      email: '',
      address: `${newLeadCity}, GA`,
      city: newLeadCity,
      concernType: newLeadConcern,
      foundation: 'Crawl Space',
      yearBuilt: 2000,
      stage: 'New Lead',
      source: 'Direct Call',
      createdAt: 'Just Now',
      notes: `Phone inquiry (${newLeadConcern}).`,
      estimatedJobValue: 4800,
      donCommissionRate: 0.15,
    };
    updateLeads([created, ...leads]);
    setNewLeadName('');
    setNewLeadPhone('');
    setIsNewLeadOpen(false);
    showToast(`Added ${created.fullName} to My Leads`);
  };

  const handleConfirmMoldTrustDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!moldTrustModalLead) return;
    const updated = leads.map((l) =>
      l.id === moldTrustModalLead.id
        ? {
            ...l,
            stage: 'Sent to Mold Trust' as LeadStage,
            estimatedJobValue: dispatchEstimate,
            moistureReadingRH: dispatchRH,
            moldTrustJobType: dispatchScope,
            notes: `Sent to Mold Trust Inc. (${dispatchScope} • ${dispatchRH}% RH).`,
          }
        : l
    );
    updateLeads(updated);
    showToast(`Sent ${moldTrustModalLead.fullName} to Mold Trust Inc.!`);
    setMoldTrustModalLead(null);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampName.trim()) return;
    const created: OutreachCampaign = {
      id: `CAMP-0${campaigns.length + 1}`,
      name: newCampName.trim(),
      targetCity: newCampCity,
      targetFoundation: vaultFoundation === 'All' ? 'Crawl Space' : vaultFoundation,
      targetAgeGroup: 'Pre-2005',
      status: 'Active',
      channel: 'Email + SMS Drip',
      totalAudience: matchedHomeownerCount,
      sentCount: 150,
      deliveredRate: 98.8,
      replyCount: 3,
      dailyLimit: newCampDaily,
      subjectOrHook: `Crawl space & moisture check in ${newCampCity}`,
      messagePreview: `Hi {{FirstName}}, I’m Don Helvey (30-year GA Broker & Certified Mold Specialist). Let me know if you’d like a quick moisture check at your ${newCampCity} home.`,
    };
    setCampaigns([created, ...campaigns]);
    setNewCampName('');
    setIsNewCampaignOpen(false);
    setActiveSection('campaigns');
    showToast(`Started campaign "${created.name}"`);
  };

  const switchSection = (sec: ErpSection) => {
    setActiveSection(sec);
    setMobileDrawerOpen(false);
    setMobileShowChatPane(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: ErpSection; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'inbox',
      label: 'Inbox',
      icon: <Inbox className="w-5 h-5" />,
      badge: stats.unreadCount > 0 ? String(stats.unreadCount) : undefined,
    },
    {
      id: 'calendar',
      label: 'Appointments',
      icon: <CalendarIcon className="w-5 h-5" />,
      badge: String(appointments.length),
    },
    {
      id: 'leads',
      label: 'My Leads',
      icon: <Users className="w-5 h-5" />,
      badge: String(leads.length),
    },
    {
      id: 'vault',
      label: '250K Homeowners',
      icon: <Database className="w-5 h-5" />,
      badge: '250K',
    },
    {
      id: 'campaigns',
      label: 'Outreach Drips',
      icon: <Send className="w-5 h-5" />,
    },
  ];

  // Calendar Week Days (Mon Nov 9 – Sun Nov 15)
  const calendarWeekDays = [
    { day: 9, dow: 'Mon', label: 'Nov 9' },
    { day: 10, dow: 'Tue', label: 'Nov 10' },
    { day: 11, dow: 'Wed', label: 'Nov 11' },
    { day: 12, dow: 'Thu', label: 'Nov 12' },
    { day: 13, dow: 'Fri', label: 'Nov 13' },
    { day: 14, dow: 'Sat', label: 'Nov 14' },
    { day: 15, dow: 'Sun', label: 'Nov 15' },
  ];

  const displayedAppointments = useMemo(() => {
    if (selectedDay === 'All') return appointments;
    return appointments.filter((a) => a.dayOfMonth === selectedDay);
  }, [appointments, selectedDay]);

  return (
    <div className="min-h-screen bg-warm text-navy-900 flex flex-col lg:flex-row font-sans">
      {/* =========================================================
          DESKTOP LATERAL SIDEBAR (Fixed Left on lg+)
         ========================================================= */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-navy-950 text-white border-r border-navy-800 z-30">
        {/* Brand Header (Neutral Sans-Serif) */}
        <div className="p-5 border-b border-navy-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest-600 flex items-center justify-center text-white font-sans font-bold text-base border border-gold-400/40 shrink-0">
            DH
          </div>
          <div>
            <div className="font-sans font-bold text-base tracking-tight text-white leading-none">
              DON HELVEY
            </div>
            <div className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider mt-1">
              Business ERP
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="p-4">
          <button
            onClick={() => setIsNewLeadOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-forest-600 hover:bg-forest-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Lead</span>
          </button>
        </div>

        {/* Lateral Menu Items */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => switchSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-forest-600 text-white shadow-sm'
                    : 'text-navy-200 hover:bg-navy-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      active
                        ? 'bg-white text-navy-950'
                        : item.id === 'inbox'
                        ? 'bg-gold-500 text-navy-950'
                        : 'bg-navy-800 text-gold-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Sidebar Footer */}
        <div className="p-4 border-t border-navy-800/80 space-y-2">
          <button
            onClick={() => {
              localStorage.removeItem('don_helvey_erp_leads_v1');
              setLeads(loadErpLeads());
              setCampaigns(INITIAL_CAMPAIGNS);
              setThreads(INITIAL_INBOX_THREADS);
              setAppointments(INITIAL_APPOINTMENTS);
              showToast('Demo data reset');
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-navy-300 hover:bg-navy-900 hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gold-300 bg-navy-900 hover:bg-navy-800 border border-navy-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Website</span>
          </button>
        </div>
      </aside>

      {/* =========================================================
          MOBILE TOP HEADER & SLIDE-OUT LATERAL DRAWER (< lg)
         ========================================================= */}
      <header className="lg:hidden sticky top-0 z-30 bg-navy-950 text-white px-4 h-15 flex items-center justify-between border-b border-navy-800 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 rounded-lg bg-navy-900 text-white border border-navy-800"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <div className="font-sans font-bold text-sm tracking-tight leading-none">
              DON HELVEY ERP
            </div>
            <div className="text-[11px] text-gold-400 font-semibold mt-0.5">
              {navItems.find((n) => n.id === activeSection)?.label}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewLeadOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-forest-600 text-white text-xs font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Lead</span>
          </button>
          <button
            onClick={() => onNavigate('/')}
            className="px-3 py-1.5 rounded-lg bg-navy-900 text-navy-200 border border-navy-800 text-xs font-semibold"
          >
            Site
          </button>
        </div>
      </header>

      {/* Mobile Lateral Slide-Over Drawer */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[82vw] bg-navy-950 text-white h-full flex flex-col justify-between p-5 z-10 shadow-2xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-forest-600 flex items-center justify-center font-sans font-bold">
                    DH
                  </div>
                  <div>
                    <div className="font-sans font-bold text-base">DON HELVEY</div>
                    <div className="text-[11px] text-gold-400">Business ERP</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 text-navy-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => switchSection(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                        active ? 'bg-forest-600 text-white' : 'text-navy-200 hover:bg-navy-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-navy-900 text-gold-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-navy-800">
              <button
                onClick={() => onNavigate('/')}
                className="w-full py-3 px-4 rounded-xl bg-navy-900 text-gold-300 text-xs font-semibold flex items-center justify-center gap-2 border border-navy-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Public Website</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MAIN CONTENT AREA (Full-Width, Neutral Sans-Serif, Spacious)
         ========================================================= */}
      <main className="flex-1 lg:pl-64 pb-24 lg:pb-10 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-6">
          {/* ---------------------------------------------------------
              VIEW 1: DASHBOARD (Full-Width, Large Cards + 2-Col Split)
             --------------------------------------------------------- */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
                    Dashboard
                  </h1>
                  <p className="text-sm sm:text-base text-navy-600 mt-1">
                    Overview of your 250K homeowner outreach, inbox replies, and upcoming appointments.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsNewAppointmentOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-navy-50 text-navy-900 border border-navy-200 text-sm font-semibold transition-colors shadow-2xs"
                  >
                    <CalendarIcon className="w-4 h-4 text-forest-600" />
                    <span>+ Book Appointment</span>
                  </button>
                  <button
                    onClick={() => setIsNewLeadOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ New Lead</span>
                  </button>
                </div>
              </div>

              {/* 4 Large Full-Width KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <button
                  onClick={() => switchSection('inbox')}
                  className="bg-white p-6 rounded-2xl border border-navy-100 shadow-sm text-left hover:border-forest-400 transition-all"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-forest-600">
                    Unread Messages
                  </div>
                  <div className="font-sans text-4xl font-bold tracking-tight text-navy-950 mt-2.5">
                    {stats.unreadCount}
                  </div>
                  <div className="text-sm text-navy-500 mt-2 flex items-center justify-between">
                    <span>SMS & Email replies</span>
                    <span className="font-semibold text-forest-600">Open Inbox →</span>
                  </div>
                </button>

                <button
                  onClick={() => switchSection('calendar')}
                  className="bg-white p-6 rounded-2xl border border-navy-100 shadow-sm text-left hover:border-forest-400 transition-all"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-navy-500">
                    Service Appointments
                  </div>
                  <div className="font-sans text-4xl font-bold tracking-tight text-navy-950 mt-2.5">
                    {appointments.length}
                  </div>
                  <div className="text-sm text-navy-500 mt-2 flex items-center justify-between">
                    <span>Scheduled this week</span>
                    <span className="font-semibold text-forest-600">Open Calendar →</span>
                  </div>
                </button>

                <button
                  onClick={() => switchSection('vault')}
                  className="bg-white p-6 rounded-2xl border border-navy-100 shadow-sm text-left hover:border-forest-400 transition-all"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-navy-500">
                    250K Homeowner List
                  </div>
                  <div className="font-sans text-4xl font-bold tracking-tight text-navy-950 mt-2.5">
                    250,000
                  </div>
                  <div className="text-sm text-navy-500 mt-2 flex items-center justify-between">
                    <span>{stats.totalContacted.toLocaleString()} reached in drips</span>
                    <span className="font-semibold text-forest-600">Explore List →</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setStageFilter('Sent to Mold Trust');
                    switchSection('leads');
                  }}
                  className="bg-navy-950 text-white p-6 rounded-2xl border border-navy-800 shadow-sm text-left"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
                    Mold Trust Pipeline
                  </div>
                  <div className="font-sans text-4xl font-bold tracking-tight text-white mt-2.5">
                    ${stats.moldTrustVolume.toLocaleString()}
                  </div>
                  <div className="text-sm text-navy-200 mt-2 flex items-center justify-between">
                    <span>
                      Don’s 15%:{' '}
                      <strong className="text-gold-400">
                        ${stats.donCommission.toLocaleString()}
                      </strong>
                    </span>
                    <span className="text-gold-300 font-semibold">
                      {stats.moldTrustCount} Jobs
                    </span>
                  </div>
                </button>
              </div>

              {/* Full-Width 2-Column Dashboard Grid (8 Cols Calls + 4 Cols Schedule & Inbox) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left 8 Cols: Priority Call List */}
                <div className="xl:col-span-8 bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-navy-100 flex items-center justify-between">
                    <div>
                      <h2 className="font-sans text-xl font-bold tracking-tight text-navy-950">
                        Homeowners to Call Today
                      </h2>
                      <p className="text-sm text-navy-500 mt-0.5">
                        Recent replies from your 250K SMS drip & website form
                      </p>
                    </div>
                    <button
                      onClick={() => switchSection('leads')}
                      className="text-sm font-semibold text-forest-600 hover:underline shrink-0"
                    >
                      All Leads ({leads.length}) →
                    </button>
                  </div>

                  <div className="divide-y divide-navy-100">
                    {leads.slice(0, 5).map((lead) => (
                      <div
                        key={lead.id}
                        className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-warm/60 transition-colors"
                      >
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="font-sans font-bold text-lg text-navy-950">
                              {lead.fullName}
                            </span>
                            <span className="text-xs font-semibold px-3 py-0.5 rounded-full bg-forest-50 text-forest-700 border border-forest-200">
                              {lead.stage}
                            </span>
                          </div>

                          <div className="text-sm text-navy-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-semibold text-navy-900">{lead.city}, GA</span>
                            <span>•</span>
                            <span>{lead.concernType}</span>
                            <span>•</span>
                            <span className="font-semibold text-forest-700">
                              Est. ${lead.estimatedJobValue.toLocaleString()}
                            </span>
                          </div>

                          <p className="text-sm text-navy-600 leading-relaxed">{lead.notes}</p>
                        </div>

                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                          <a
                            href={`tel:${lead.phone.replace(/[^0-9]/g, '')}`}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            <span>{lead.phone}</span>
                          </a>

                          <button
                            onClick={() => {
                              setMoldTrustModalLead(lead);
                              setDispatchEstimate(lead.estimatedJobValue);
                            }}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-300 text-sm font-semibold transition-colors"
                          >
                            <Building2 className="w-4 h-4" />
                            <span>Send to Mold Trust</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 4 Cols: Upcoming Appointments & Unread Inbox */}
                <div className="xl:col-span-4 space-y-6">
                  {/* Upcoming Appointments Box */}
                  <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans text-lg font-bold tracking-tight text-navy-950">
                        Next Appointments
                      </h3>
                      <button
                        onClick={() => switchSection('calendar')}
                        className="text-xs font-semibold text-forest-600 hover:underline"
                      >
                        Full Calendar →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {appointments.slice(0, 3).map((apt) => (
                        <div
                          key={apt.id}
                          onClick={() => {
                            setSelectedDay(apt.dayOfMonth);
                            switchSection('calendar');
                          }}
                          className="p-4 rounded-xl bg-warm border border-navy-100 hover:border-forest-300 cursor-pointer transition-all space-y-1"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-forest-700">
                            <span>{apt.dateLabel}</span>
                            <span>{apt.timeSlot}</span>
                          </div>
                          <div className="font-sans font-bold text-base text-navy-950">
                            {apt.homeownerName}
                          </div>
                          <div className="text-xs text-navy-600">
                            {apt.address}, {apt.city} • {apt.serviceType.split('—')[0]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Inbox Box */}
                  <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans text-lg font-bold tracking-tight text-navy-950">
                        Recent Messages
                      </h3>
                      <button
                        onClick={() => switchSection('inbox')}
                        className="text-xs font-semibold text-forest-600 hover:underline"
                      >
                        Open Inbox →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {threads.slice(0, 3).map((t) => {
                        const last = t.messages[t.messages.length - 1];
                        return (
                          <div
                            key={t.id}
                            onClick={() => {
                              handleSelectThread(t.id);
                              switchSection('inbox');
                            }}
                            className="p-4 rounded-xl bg-warm border border-navy-100 hover:border-forest-300 cursor-pointer transition-all space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-sans font-bold text-sm text-navy-950 flex items-center gap-2">
                                {t.unread && (
                                  <span className="w-2 h-2 rounded-full bg-forest-600" />
                                )}
                                {t.homeownerName}
                              </span>
                              <span className="text-xs text-navy-400">{t.lastTime}</span>
                            </div>
                            <p className="text-xs text-navy-600 line-clamp-2">{last?.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------
              VIEW 2: INBOX MOCKUP (Large, Full-Height, Spacious 2-Pane)
             --------------------------------------------------------- */}
          {activeSection === 'inbox' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
                    Homeowner Inbox
                  </h1>
                  <p className="text-sm sm:text-base text-navy-600 mt-0.5">
                    Direct SMS replies from your 250K campaigns, emails, and website inquiries.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-navy-100 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px] lg:h-[calc(100vh-175px)]">
                {/* Left Thread List (4 Cols on Desktop, Full Height Scrollable) */}
                <div
                  className={`lg:col-span-4 border-r border-navy-100 flex flex-col h-full overflow-hidden ${
                    mobileShowChatPane ? 'hidden lg:flex' : 'flex'
                  }`}
                >
                  <div className="p-5 bg-warm/70 border-b border-navy-100 flex items-center justify-between shrink-0">
                    <span className="text-sm font-bold uppercase tracking-wider text-navy-700">
                      Messages ({threads.length})
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-forest-100 text-forest-800">
                      {stats.unreadCount} Unread
                    </span>
                  </div>

                  <div className="divide-y divide-navy-100 overflow-y-auto flex-1">
                    {threads.map((thread) => {
                      const isSelected = thread.id === activeThread.id;
                      const lastMsg = thread.messages[thread.messages.length - 1];
                      const initials = thread.homeownerName
                        .split(' ')
                        .map((w) => w[0])
                        .filter((c) => c && /[A-Z]/.test(c))
                        .slice(0, 2)
                        .join('');

                      return (
                        <button
                          key={thread.id}
                          onClick={() => handleSelectThread(thread.id)}
                          className={`w-full text-left p-5 transition-colors flex items-start gap-3.5 ${
                            isSelected
                              ? 'bg-forest-50/90 border-l-4 border-l-forest-600'
                              : 'hover:bg-warm/60'
                          }`}
                        >
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center font-sans font-bold text-sm shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-forest-600 text-white'
                                : 'bg-navy-100 text-navy-800'
                            }`}
                          >
                            {initials}
                          </div>

                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 truncate">
                                {thread.unread && (
                                  <span className="w-2.5 h-2.5 rounded-full bg-forest-600 shrink-0" />
                                )}
                                <span className="font-sans font-bold text-base text-navy-950 truncate">
                                  {thread.homeownerName}
                                </span>
                              </div>
                              <span className="text-xs font-medium text-navy-400 shrink-0">
                                {thread.lastTime}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-navy-500">
                              <span className="inline-flex items-center gap-1 font-semibold text-forest-700">
                                {thread.channel === 'SMS Reply' ? (
                                  <MessageSquare className="w-3.5 h-3.5" />
                                ) : (
                                  <Mail className="w-3.5 h-3.5" />
                                )}
                                {thread.channel}
                              </span>
                              <span>•</span>
                              <span className="font-medium text-navy-700">{thread.city}, GA</span>
                            </div>

                            <p
                              className={`text-sm line-clamp-2 leading-snug ${
                                thread.unread ? 'font-semibold text-navy-900' : 'text-navy-600'
                              }`}
                            >
                              {lastMsg?.text}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Conversation View (8 Cols on Desktop, Large & Easy to Read) */}
                <div
                  className={`lg:col-span-8 flex flex-col justify-between h-full overflow-hidden ${
                    mobileShowChatPane ? 'flex' : 'hidden lg:flex'
                  }`}
                >
                  {/* Thread Header */}
                  <div className="p-5 sm:px-7 border-b border-navy-100 flex flex-wrap items-center justify-between gap-4 bg-white shrink-0">
                    <div className="flex items-center gap-3.5">
                      <button
                        onClick={() => setMobileShowChatPane(false)}
                        className="lg:hidden p-2.5 rounded-xl bg-warm text-navy-800 border border-navy-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-sans font-bold text-lg sm:text-xl text-navy-950">
                            {activeThread.homeownerName}
                          </h3>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-700 border border-forest-200">
                            {activeThread.channel}
                          </span>
                        </div>
                        <div className="text-sm text-navy-600 mt-0.5">
                          {activeThread.address}, <strong>{activeThread.city}</strong>, GA •{' '}
                          {activeThread.phone}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <a
                        href={`tel:${activeThread.phone.replace(/[^0-9]/g, '')}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold shadow-2xs transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call {activeThread.phone}</span>
                      </a>
                      <button
                        onClick={() => {
                          setAptName(activeThread.homeownerName);
                          setAptCity(activeThread.city);
                          setAptAddress(activeThread.address);
                          setAptPhone(activeThread.phone);
                          setIsNewAppointmentOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-800 text-white text-sm font-semibold transition-colors"
                      >
                        <CalendarIcon className="w-4 h-4 text-gold-400" />
                        <span>Schedule Walk</span>
                      </button>
                    </div>
                  </div>

                  {/* Messages Feed (Spacious & High-Contrast) */}
                  <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto bg-warm/40">
                    {activeThread.messages.map((msg) => {
                      const isDon = msg.sender === 'don';
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col max-w-2xl ${
                            isDon ? 'ml-auto items-end' : 'mr-auto items-start'
                          }`}
                        >
                          <div
                            className={`p-4 sm:p-5 rounded-2xl text-sm sm:text-base leading-relaxed shadow-2xs ${
                              isDon
                                ? 'bg-forest-600 text-white rounded-br-xs'
                                : 'bg-white text-navy-900 border border-navy-100 rounded-bl-xs'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <span className="text-xs font-medium text-navy-500 mt-1.5 px-1">
                            {isDon ? 'Don Helvey' : activeThread.homeownerName} • {msg.timestamp}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick-Reply Templates + Large Composer */}
                  <div className="p-4 sm:p-5 border-t border-navy-100 bg-white space-y-3 shrink-0">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                      <span className="text-xs font-bold uppercase text-navy-400 shrink-0">
                        Quick Replies:
                      </span>
                      {[
                        'I am in your area Thursday morning—would 10:00 AM work for a quick moisture check?',
                        'Happy to help. I’ll give you a quick call in 15 minutes to discuss.',
                        'No problem—I can inspect the crawl space and coordinate directly with Mold Trust if needed.',
                      ].map((tpl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setReplyDraft(tpl)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-warm hover:bg-forest-50 text-navy-700 hover:text-forest-800 border border-navy-200 whitespace-nowrap transition-colors"
                        >
                          "{tpl.slice(0, 48)}..."
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSendReply} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={replyDraft}
                        onChange={(e) => setReplyDraft(e.target.value)}
                        placeholder={`Write a message to ${activeThread.homeownerName}...`}
                        className="flex-1 rounded-xl border border-navy-200 bg-warm px-4 py-3.5 text-sm sm:text-base text-navy-950 focus:outline-none focus:border-forest-600"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-sm sm:text-base font-semibold inline-flex items-center gap-2 shrink-0 shadow-sm transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Reply</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------
              VIEW 3: SERVICE APPOINTMENTS CALENDAR (Full-Size Month Grid + Agenda)
             --------------------------------------------------------- */}
          {activeSection === 'calendar' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
                    Service Appointments Calendar
                  </h1>
                  <p className="text-sm sm:text-base text-navy-600 mt-0.5">
                    Don’s on-site property moisture walks and Mold Trust crew schedules across North Georgia.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedDay('All')}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                      selectedDay === 'All'
                        ? 'bg-navy-950 text-white border-navy-950'
                        : 'bg-white text-navy-800 border-navy-200 hover:bg-navy-50'
                    }`}
                  >
                    Show All Month ({appointments.length})
                  </button>
                  <button
                    onClick={() => setIsNewAppointmentOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ New Appointment</span>
                  </button>
                </div>
              </div>

              {/* Full-Width 12-Col Split: Left 8 Cols Month Grid + Right 4 Cols Day Agenda */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Left 8 Cols: Full-Size Month Calendar Grid */}
                <div className="xl:col-span-8 bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
                  {/* Calendar Top Bar */}
                  <div className="p-5 sm:px-6 border-b border-navy-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <h2 className="font-sans text-xl font-bold text-navy-950">
                        November 2026
                      </h2>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest-50 text-forest-700 border border-forest-200">
                        North Georgia Corridor
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-navy-700">
                        <span className="w-3 h-3 rounded-xs bg-forest-600 inline-block" />
                        Don’s Inspection Walk
                      </span>
                      <span className="flex items-center gap-1.5 text-navy-700">
                        <span className="w-3 h-3 rounded-xs bg-navy-950 inline-block" />
                        Mold Trust Crew Job
                      </span>
                    </div>
                  </div>

                  {/* Day-of-Week Header Row */}
                  <div className="grid grid-cols-7 bg-warm border-b border-navy-100 text-center py-3 text-xs font-bold uppercase tracking-wider text-navy-500">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>

                  {/* 30 Days Month Grid (Nov 1 starts on Sunday) */}
                  <div className="grid grid-cols-7 divide-x divide-y divide-navy-100 border-b border-navy-100">
                    {Array.from({ length: 30 }, (_, idx) => idx + 1).map((dayNum) => {
                      const dayAppts = appointments.filter((a) => a.dayOfMonth === dayNum);
                      const isSelected = selectedDay === dayNum;
                      const isToday = dayNum === 10;

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          onClick={() => setSelectedDay(dayNum)}
                          className={`min-h-[95px] sm:min-h-[125px] p-2 sm:p-3 text-left flex flex-col justify-between transition-all hover:bg-forest-50/40 ${
                            isSelected
                              ? 'bg-forest-50/80 ring-2 ring-inset ring-forest-600'
                              : 'bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-xs sm:text-sm font-bold ${
                                isSelected
                                  ? 'bg-forest-600 text-white'
                                  : isToday
                                  ? 'bg-navy-950 text-gold-400'
                                  : 'text-navy-800'
                              }`}
                            >
                              {dayNum}
                            </span>
                            {dayAppts.length > 0 && (
                              <span className="text-[11px] font-bold text-forest-700 hidden sm:inline">
                                {dayAppts.length} {dayAppts.length === 1 ? 'visit' : 'visits'}
                              </span>
                            )}
                          </div>

                          {/* Event Pills inside Calendar Cell */}
                          <div className="space-y-1.5 w-full mt-2">
                            {dayAppts.map((ev) => {
                              const isCrew = ev.serviceType.includes('Mold Trust Crew');
                              return (
                                <div
                                  key={ev.id}
                                  className={`px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold truncate ${
                                    isCrew
                                      ? 'bg-navy-950 text-gold-300'
                                      : 'bg-forest-600 text-white'
                                  }`}
                                >
                                  <span className="hidden sm:inline">
                                    {ev.timeSlot.split('–')[0].trim()} •{' '}
                                  </span>
                                  {ev.homeownerName.split(' ')[0]} ({ev.city})
                                </div>
                              );
                            })}
                          </div>
                        </button>
                      );
                    })}

                    {/* Trailing 5 Empty Cells to complete 35-cell grid */}
                    {Array.from({ length: 5 }, (_, idx) => (
                      <div
                        key={`empty-${idx}`}
                        className="min-h-[95px] sm:min-h-[125px] bg-warm/40 p-3 text-xs text-navy-300"
                      />
                    ))}
                  </div>
                </div>

                {/* Right 4 Cols: Selected Day Agenda & Details */}
                <div className="xl:col-span-4 bg-white rounded-2xl border border-navy-100 shadow-sm p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-navy-100 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-forest-600">
                        Daily Route & Schedule
                      </span>
                      <h3 className="font-sans text-xl font-bold text-navy-950 mt-0.5">
                        {selectedDay === 'All'
                          ? `All November Visits (${appointments.length})`
                          : `November ${selectedDay}, 2026 (${displayedAppointments.length})`}
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        if (typeof selectedDay === 'number') setAptDay(selectedDay);
                        setIsNewAppointmentOpen(true);
                      }}
                      className="p-2.5 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-700"
                      title="Add Appointment"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {displayedAppointments.length === 0 ? (
                    <div className="py-12 text-center space-y-3">
                      <CalendarIcon className="w-10 h-10 text-navy-300 mx-auto" />
                      <div className="font-sans font-bold text-base text-navy-900">
                        No visits booked for November {selectedDay}
                      </div>
                      <p className="text-xs text-navy-500 max-w-xs mx-auto">
                        Click another highlighted date on the calendar or schedule a new property walk below.
                      </p>
                      <button
                        onClick={() => {
                          if (typeof selectedDay === 'number') setAptDay(selectedDay);
                          setIsNewAppointmentOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-forest-600 text-white text-xs font-semibold"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Schedule on Nov {selectedDay}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {displayedAppointments.map((apt) => {
                        const isMoldTrustCrew = apt.serviceType.includes('Mold Trust Crew');
                        return (
                          <div
                            key={apt.id}
                            className="p-5 rounded-2xl bg-warm border border-navy-100 space-y-3"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg bg-navy-950 text-gold-300">
                                <Clock className="w-3.5 h-3.5" />
                                {apt.dateLabel} • {apt.timeSlot}
                              </span>
                            </div>

                            <div>
                              <span
                                className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md mb-1.5 ${
                                  isMoldTrustCrew
                                    ? 'bg-gold-500/20 text-navy-950 border border-gold-400'
                                    : 'bg-forest-100 text-forest-800'
                                }`}
                              >
                                {apt.serviceType}
                              </span>
                              <h4 className="font-sans font-bold text-lg text-navy-950">
                                {apt.homeownerName}
                              </h4>
                              <div className="text-sm text-navy-700 flex items-center gap-1.5 mt-1">
                                <MapPin className="w-4 h-4 text-forest-600 shrink-0" />
                                <span>
                                  {apt.address}, <strong>{apt.city}</strong>, GA
                                </span>
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm text-navy-600 leading-relaxed bg-white p-3 rounded-xl border border-navy-100">
                              {apt.notes}
                            </p>

                            <div className="pt-1 flex items-center gap-2">
                              <a
                                href={`tel:${apt.phone.replace(/[^0-9]/g, '')}`}
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs sm:text-sm font-semibold transition-colors"
                              >
                                <Phone className="w-4 h-4" />
                                <span>Call {apt.phone}</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------
              VIEW 4: MY LEADS (Neutral Sans Titles, Clean Cards)
             --------------------------------------------------------- */}
          {activeSection === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
                    My Leads ({leads.length})
                  </h1>
                  <p className="text-sm text-navy-600 mt-1">
                    Track every homeowner from first call to Mold Trust completion.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewLeadOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lead</span>
                </button>
              </div>

              {/* Stage Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                <button
                  onClick={() => setStageFilter('All')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                    stageFilter === 'All'
                      ? 'bg-navy-950 text-white'
                      : 'bg-white text-navy-700 border border-navy-200 hover:bg-navy-50'
                  }`}
                >
                  All ({leads.length})
                </button>
                {LEAD_STAGES.map((stg) => {
                  const count = leads.filter((l) => l.stage === stg).length;
                  return (
                    <button
                      key={stg}
                      onClick={() => setStageFilter(stg)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                        stageFilter === stg
                          ? 'bg-forest-600 text-white'
                          : 'bg-white text-navy-700 border border-navy-200 hover:bg-navy-50'
                      }`}
                    >
                      {stg} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Lead Cards */}
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-2xl p-5 border border-navy-100 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-sans text-lg font-bold tracking-tight text-navy-950">
                            {lead.fullName}
                          </h3>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-warm border border-navy-200 text-navy-700">
                            {lead.source}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-navy-600 flex items-center gap-1.5 mt-1">
                          <MapPin className="w-4 h-4 text-forest-600 shrink-0" />
                          <span>
                            {lead.address}, {lead.city}, GA • {lead.foundation} (Built{' '}
                            {lead.yearBuilt})
                          </span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-warm border border-navy-100 self-start">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-navy-500">
                            Est. Job
                          </div>
                          <div className="font-sans text-sm font-bold text-navy-950">
                            ${lead.estimatedJobValue.toLocaleString()}
                          </div>
                        </div>
                        <div className="h-6 w-px bg-navy-200" />
                        <div>
                          <div className="text-[10px] uppercase font-bold text-forest-700">
                            Don 15% Fee
                          </div>
                          <div className="font-sans text-sm font-bold text-forest-700">
                            ${Math.round(lead.estimatedJobValue * 0.15).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-navy-700 bg-warm/70 p-3.5 rounded-xl border border-navy-100/80">
                      {lead.notes}
                    </p>

                    <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <a
                          href={`tel:${lead.phone.replace(/[^0-9]/g, '')}`}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs sm:text-sm font-semibold transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call {lead.phone}</span>
                        </a>

                        {lead.stage !== 'Sent to Mold Trust' && lead.stage !== 'Completed' && (
                          <button
                            onClick={() => {
                              setMoldTrustModalLead(lead);
                              setDispatchEstimate(lead.estimatedJobValue);
                            }}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-800 text-gold-300 text-xs sm:text-sm font-semibold transition-colors"
                          >
                            <Building2 className="w-4 h-4" />
                            <span>Send to Mold Trust</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase text-navy-500">Stage:</span>
                        <select
                          value={lead.stage}
                          onChange={(e) =>
                            handleStageChange(lead.id, e.target.value as LeadStage)
                          }
                          className="flex-1 sm:flex-initial rounded-xl border border-navy-200 bg-warm px-3.5 py-2 text-xs sm:text-sm font-bold text-navy-950 focus:outline-none focus:border-forest-600"
                        >
                          {LEAD_STAGES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------
              VIEW 5: 250K HOMEOWNERS
             --------------------------------------------------------- */}
          {activeSection === 'vault' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
                  250,000 Homeowner Database
                </h1>
                <p className="text-sm text-navy-600 mt-1">
                  Filter by city and foundation type to launch a drip or add a homeowner to your leads.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-navy-100 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-navy-600 mb-1.5">
                      1. Select City
                    </label>
                    <select
                      value={vaultCity}
                      onChange={(e) => setVaultCity(e.target.value)}
                      className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-sm font-semibold text-navy-950"
                    >
                      <option value="All">All 8 Cities (250,000)</option>
                      {DATABASE_CITY_BREAKDOWN.map((c) => (
                        <option key={c.city} value={c.city}>
                          {c.city} ({c.totalHomes.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-navy-600 mb-1.5">
                      2. Foundation Type
                    </label>
                    <select
                      value={vaultFoundation}
                      onChange={(e) => setVaultFoundation(e.target.value)}
                      className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-sm font-semibold text-navy-950"
                    >
                      <option value="All">All Foundations</option>
                      <option value="Crawl Space">Crawl Space Only</option>
                      <option value="Basement">Basement</option>
                      <option value="Slab">Concrete Slab</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-navy-600 mb-1.5">
                      3. Search Name or Street
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={vaultSearch}
                        onChange={(e) => setVaultSearch(e.target.value)}
                        placeholder="Search homeowner..."
                        className="w-full rounded-xl border border-navy-200 bg-warm pl-10 pr-3.5 py-2.5 text-sm text-navy-950"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-sans text-2xl font-bold text-gold-400">
                      {matchedHomeownerCount.toLocaleString()}
                    </span>{' '}
                    <span className="text-sm text-navy-100">
                      Matching Homeowners in{' '}
                      <strong>{vaultCity === 'All' ? 'North Georgia' : vaultCity}</strong>
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setNewCampCity(vaultCity === 'All' ? 'North Georgia' : vaultCity);
                      setNewCampName(
                        `${vaultCity === 'All' ? 'North GA' : vaultCity} ${
                          vaultFoundation === 'All' ? 'Crawl Space' : vaultFoundation
                        } Drip`
                      );
                      setIsNewCampaignOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Drip to This List</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-navy-100 shadow-sm divide-y divide-navy-100">
                {filteredHomeowners.map((row) => (
                  <div
                    key={row.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-warm/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-sans font-bold text-base text-navy-950">
                          {row.fullName}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-800 border border-forest-200">
                          {row.foundation}
                        </span>
                        <span className="text-xs text-navy-500">Built {row.yearBuilt}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-navy-600">
                        {row.address}, <strong>{row.city}</strong>, GA {row.zip} • {row.phone}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <span className="text-xs font-semibold text-navy-500">
                        {row.outreachStatus}
                      </span>
                      <button
                        onClick={() => handleAddFromVault(row)}
                        className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-forest-600 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <span>+ Add to Leads</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------
              VIEW 6: OUTREACH DRIPS (Neutral Sans Titles)
             --------------------------------------------------------- */}
          {activeSection === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
                    Outreach Drip Campaigns
                  </h1>
                  <p className="text-sm text-navy-600 mt-1">
                    Adjust how many homeowners receive your message each day, or pause anytime.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewCampaignOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Campaign</span>
                </button>
              </div>

              <div className="space-y-4">
                {campaigns.map((camp) => {
                  const pct = Math.min(
                    100,
                    Math.round((camp.sentCount / camp.totalAudience) * 100)
                  );
                  return (
                    <div
                      key={camp.id}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-navy-100 shadow-sm space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                camp.status === 'Active'
                                  ? 'bg-forest-100 text-forest-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {camp.status}
                            </span>
                            <span className="text-xs font-semibold text-navy-500">
                              {camp.targetCity} • {camp.targetFoundation}
                            </span>
                          </div>
                          <h3 className="font-sans text-lg font-bold tracking-tight text-navy-950 mt-1.5">
                            {camp.name}
                          </h3>
                        </div>

                        <button
                          onClick={() => {
                            const next = camp.status === 'Active' ? 'Paused' : 'Active';
                            setCampaigns((prev) =>
                              prev.map((c) => (c.id === camp.id ? { ...c, status: next } : c))
                            );
                            showToast(`${next === 'Active' ? 'Resumed' : 'Paused'} campaign`);
                          }}
                          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-warm hover:bg-navy-100 text-navy-800 border border-navy-200 text-xs sm:text-sm font-semibold"
                        >
                          {camp.status === 'Active' ? (
                            <>
                              <Pause className="w-4 h-4 text-amber-600" />
                              <span>Pause Campaign</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 text-forest-600" />
                              <span>Resume Campaign</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs sm:text-sm font-semibold text-navy-800 mb-1.5">
                          <span>
                            {camp.sentCount.toLocaleString()} of{' '}
                            {camp.totalAudience.toLocaleString()} Homeowners Contacted ({pct}%)
                          </span>
                          <span className="text-forest-700 font-bold">
                            {camp.replyCount} Replies
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-navy-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-forest-600 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-navy-100">
                        <div className="flex justify-between text-xs font-bold text-navy-700 mb-1">
                          <span>Daily Send Speed:</span>
                          <span className="text-forest-700">
                            {camp.dailyLimit} Homeowners / Day
                          </span>
                        </div>
                        <input
                          type="range"
                          min={100}
                          max={1500}
                          step={50}
                          value={camp.dailyLimit}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setCampaigns((prev) =>
                              prev.map((c) => (c.id === camp.id ? { ...c, dailyLimit: val } : c))
                            );
                          }}
                          className="w-full accent-forest-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =========================================================
          MOBILE BOTTOM NAVIGATION BAR (5 Key Tabs on Mobile)
         ========================================================= */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-navy-950 text-white border-t border-navy-800 grid grid-cols-5 h-16">
        {navItems.slice(0, 5).map((item) => {
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => switchSection(item.id)}
              className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
                active ? 'text-gold-400 bg-navy-900' : 'text-navy-300'
              }`}
            >
              {item.icon}
              <span className="truncate max-w-[64px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* =========================================================
          MODAL 1: NEW APPOINTMENT (Calendar)
         ========================================================= */}
      {isNewAppointmentOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-navy-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-navy-100 pb-3">
              <h3 className="font-sans text-lg font-bold text-navy-950">
                Schedule Service Appointment
              </h3>
              <button
                onClick={() => setIsNewAppointmentOpen(false)}
                className="p-1.5 text-navy-400 hover:text-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                  Homeowner Name *
                </label>
                <input
                  type="text"
                  required
                  value={aptName}
                  onChange={(e) => setAptName(e.target.value)}
                  placeholder="e.g. Robert & Linda Thornton"
                  className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-sm text-navy-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                    Day
                  </label>
                  <select
                    value={aptDay}
                    onChange={(e) => setAptDay(Number(e.target.value))}
                    className="w-full rounded-xl border border-navy-200 bg-warm px-3 py-2.5 text-sm font-semibold text-navy-950"
                  >
                    {calendarWeekDays.map((d) => (
                      <option key={d.day} value={d.day}>
                        {d.dow}, {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={aptTime}
                    onChange={(e) => setAptTime(e.target.value)}
                    className="w-full rounded-xl border border-navy-200 bg-warm px-3 py-2.5 text-sm font-semibold text-navy-950"
                  >
                    <option value="9:00 AM – 10:30 AM">9:00 AM – 10:30 AM</option>
                    <option value="10:30 AM – 12:00 PM">10:30 AM – 12:00 PM</option>
                    <option value="1:30 PM – 3:00 PM">1:30 PM – 3:00 PM</option>
                    <option value="3:30 PM – 5:00 PM">3:30 PM – 5:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                  Service Type
                </label>
                <select
                  value={aptType}
                  onChange={(e) => setAptType(e.target.value as any)}
                  className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-sm font-semibold text-navy-950"
                >
                  <option value="Don — Moisture & Mold Inspection">
                    Don — Moisture & Mold Inspection
                  </option>
                  <option value="Mold Trust Crew — Remediation & Encapsulation">
                    Mold Trust Crew — Remediation & Encapsulation
                  </option>
                  <option value="Don — Pre-Listing Broker Walk">
                    Don — Pre-Listing Broker Walk
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                    City
                  </label>
                  <select
                    value={aptCity}
                    onChange={(e) => setAptCity(e.target.value)}
                    className="w-full rounded-xl border border-navy-200 bg-warm px-3 py-2.5 text-sm font-semibold text-navy-950"
                  >
                    {DATABASE_CITY_BREAKDOWN.map((c) => (
                      <option key={c.city} value={c.city}>
                        {c.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={aptPhone}
                    onChange={(e) => setAptPhone(e.target.value)}
                    placeholder="(770) 555-0148"
                    className="w-full rounded-xl border border-navy-200 bg-warm px-3 py-2.5 text-sm text-navy-950"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewAppointmentOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-warm text-navy-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-xs"
                >
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: SEND LEAD TO MOLD TRUST INC.
         ========================================================= */}
      {moldTrustModalLead && (
        <div className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-navy-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-navy-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase text-forest-600">
                  Mold Trust Inc. Handoff
                </span>
                <h3 className="font-sans text-lg font-bold text-navy-950">
                  Send {moldTrustModalLead.fullName}
                </h3>
              </div>
              <button
                onClick={() => setMoldTrustModalLead(null)}
                className="p-1.5 text-navy-400 hover:text-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmMoldTrustDispatch} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                  Recommended Service Scope
                </label>
                <select
                  value={dispatchScope}
                  onChange={(e) => setDispatchScope(e.target.value)}
                  className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-sm font-semibold text-navy-950"
                >
                  <option value="Crawl Space Remediation + Encapsulation">
                    Crawl Space Remediation + Encapsulation
                  </option>
                  <option value="Crawl Space Vapor Barrier + Dehumidifier">
                    Crawl Space Vapor Barrier + Dehumidifier
                  </option>
                  <option value="Basement / Interior Mold Remediation">
                    Basement / Interior Mold Remediation
                  </option>
                  <option value="Pre-Closing Fast-Track Remediation">
                    Pre-Closing Fast-Track Remediation
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                    Humidity Reading (RH %)
                  </label>
                  <input
                    type="number"
                    value={dispatchRH}
                    onChange={(e) => setDispatchRH(Number(e.target.value))}
                    className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-sm font-bold text-navy-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                    Est. Job Value ($)
                  </label>
                  <input
                    type="number"
                    step={100}
                    value={dispatchEstimate}
                    onChange={(e) => setDispatchEstimate(Number(e.target.value))}
                    className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-sm font-bold text-navy-950"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-navy-950 text-white flex items-center justify-between text-xs">
                <span>Don’s Estimated 15% Commission:</span>
                <span className="font-sans text-base font-bold text-gold-400">
                  ${Math.round(dispatchEstimate * 0.15).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMoldTrustModalLead(null)}
                  className="px-4 py-2.5 rounded-xl bg-warm text-navy-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-xs"
                >
                  Confirm & Send to Mold Trust
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 3: ADD NEW LEAD
         ========================================================= */}
      {isNewLeadOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-navy-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-navy-100 pb-3">
              <h3 className="font-sans text-lg font-bold text-navy-950">Add New Lead</h3>
              <button
                onClick={() => setIsNewLeadOpen(false)}
                className="p-1.5 text-navy-400 hover:text-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  placeholder="(770) 555-0199"
                  className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-sm text-navy-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                  Homeowner Name *
                </label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Mark & Susan Holloway"
                  className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-sm text-navy-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                    City
                  </label>
                  <select
                    value={newLeadCity}
                    onChange={(e) => setNewLeadCity(e.target.value)}
                    className="w-full rounded-xl border border-navy-200 bg-warm px-3 py-2.5 text-sm font-semibold text-navy-950"
                  >
                    {DATABASE_CITY_BREAKDOWN.map((c) => (
                      <option key={c.city} value={c.city}>
                        {c.city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                    Concern
                  </label>
                  <select
                    value={newLeadConcern}
                    onChange={(e) => setNewLeadConcern(e.target.value)}
                    className="w-full rounded-xl border border-navy-200 bg-warm px-3 py-2.5 text-sm font-semibold text-navy-950"
                  >
                    <option value="Crawl Space Concerns">Crawl Space</option>
                    <option value="Visible Mold">Visible Mold</option>
                    <option value="Moisture & Water">Moisture</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewLeadOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-warm text-navy-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-xs"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 4: NEW DRIP CAMPAIGN
         ========================================================= */}
      {isNewCampaignOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-navy-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-navy-100 pb-3">
              <h3 className="font-sans text-lg font-bold text-navy-950">
                New Outreach Campaign
              </h3>
              <button
                onClick={() => setIsNewCampaignOpen(false)}
                className="p-1.5 text-navy-400 hover:text-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase text-navy-600 mb-1">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCampName}
                  onChange={(e) => setNewCampName(e.target.value)}
                  placeholder="e.g. Cumming Crawl Space Check"
                  className="w-full rounded-xl border border-navy-200 bg-warm px-3.5 py-2.5 text-sm text-navy-950"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-navy-700 mb-1">
                  <span>Daily Send Speed:</span>
                  <span className="text-forest-700">{newCampDaily} Homes / Day</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1500}
                  step={50}
                  value={newCampDaily}
                  onChange={(e) => setNewCampDaily(Number(e.target.value))}
                  className="w-full accent-forest-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewCampaignOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-warm text-navy-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-xs"
                >
                  Start Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 bg-navy-950 text-white px-4 py-3 rounded-xl shadow-xl border border-gold-400/50 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
