import { useState, useEffect } from 'react';
import { API_URL } from '../config';
import { Trash2, Edit, Plus, Image as ImageIcon, Lock, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (token) {
      fetchItems();
      if (activeTab === 'gallery') fetchAlbums();
    }
  }, [activeTab, token]);

  const fetchAlbums = async () => {
    try {
      const res = await fetch(`${API_URL}/albums`);
      const data = await res.json();
      setAlbums(data);
    } catch (err) { console.error(err); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setErrorMsg('');
      } else {
        setErrorMsg('Invalid Credentials. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Server error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setItems([]);
  };

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_URL}/${activeTab}`);
      const data = await res.json();
      setItems(data);
    } catch (err) { console.error(err); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Frontend Check: Don't even start the network request if too big
    if (file.size > 10 * 1024 * 1024) {
      alert(`The image "${file.name}" is too large (Max size: 10MB). Please resize or compress it before uploading to our archives.`);
      return;
    }
    
    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('image', file);
    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataObj
      });
      if (res.status === 413) {
        alert('File too large. Maximum size allowed is 10MB.');
        return;
      }
      if (res.status === 401 || res.status === 403) return handleLogout();
      const data = await res.json();
      setFormData(prev => ({ ...prev, imageUrl: data.imageUrl }));
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAdditionalImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('image', file);
    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj
      });
      if (res.status === 413) {
        alert('File too large. Maximum size allowed is 10MB.');
        return;
      }
      if (res.status === 401 || res.status === 403) return handleLogout();
      const data = await res.json();
      setFormData(prev => ({ ...prev, additionalImages: [...(prev.additionalImages || []), data.imageUrl] }));
    } catch (err) {
      console.error(err);
      alert('Error uploading additional image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleBulkImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    // Pre-check all files before starting batch upload
    const oversizedFiles = files.filter(f => f.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      const names = oversizedFiles.map(f => f.name).join(', ');
      alert(`Oops! The following files exceed our 10MB royal limit: ${names}. All files must be compressed before addition.`);
      return;
    }

    setIsUploading(true);
    
    const uploadedUrls = [];
    for (const file of files) {
      const formDataObj = new FormData();
      formDataObj.append('image', file);
      try {
        const res = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formDataObj
        });
        if (res.status === 413) { alert(`File ${file.name} too large (Max 10MB)`); continue; }
        if (res.status === 401 || res.status === 403) return handleLogout();
        const data = await res.json();
        uploadedUrls.push(data.imageUrl);
      } catch (err) { console.error(err); }
    }
    setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...uploadedUrls] }));
    setIsUploading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isNew = !formData._id;
    
    // Gallery Save (Handles consolidation by eventName)
    if (activeTab === 'gallery') {
      try {
        const url = `${API_URL}/gallery${isNew ? '' : `/${formData._id}`}`;
        const res = await fetch(url, {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(formData)
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          if (errorData.error?.includes('duplicate key')) {
            alert('This event already exists. Please find it in the list and click "Edit" to add more images.');
          } else {
            alert(`Error saving: ${errorData.error}`);
          }
          return;
        }
        setFormData(null);
        fetchItems();
        return;
      } catch (err) { console.error(err); alert('Error during gallery save'); return; }
    }

    // Default Save (Other Tabs)
    const url = `${API_URL}/${activeTab}${isNew ? '' : `/${formData._id}`}`;
    try {
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.status === 401 || res.status === 403) return handleLogout();
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error saving: ${errorData.error}`);
        return;
      }
      setFormData(null);
      fetchItems();
    } catch (err) { console.error(err); alert('Network or Server Error while saving'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      const res = await fetch(`${API_URL}/${activeTab}/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) return handleLogout();
      fetchItems();
    } catch (err) { console.error(err); }
  };

  if (!token) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-rajasthan-navy text-white bg-immersive-dust p-4 md:p-6 flex-col">
        <h1 className="text-3xl md:text-6xl text-rajasthan-gold font-bold font-ethnic mb-3 md:mb-4 drop-shadow-md text-center uppercase tracking-tighter">Restricted Area</h1>
        <p className="mb-10 md:mb-12 text-[10px] md:text-sm text-amber-200/80 font-medium font-royal tracking-[0.2em] md:tracking-[0.4em] uppercase text-center max-w-xs md:max-w-none">
          Please enter the royal decree (password) to access.
        </p>
        
        <form onSubmit={handleLogin} className="dark-royal-glass p-6 md:p-10 rounded-[2rem] shadow-[0_0_50px_rgba(212,175,55,0.15)] w-full max-w-sm border border-rajasthan-gold/30 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rajasthan-gold/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform blur-xl"></div>
          
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-rajasthan-navy/80 border border-rajasthan-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.4)] text-rajasthan-gold rounded-full flex items-center justify-center transition-transform hover:rotate-12">
              <Lock className="w-6 h-6 md:w-10 md:h-10" />
            </div>
          </div>

          {errorMsg && (
            <div className="animate-shake mb-6">
              <p className="text-red-400 text-center text-xs md:text-sm font-bold bg-red-900/20 py-3 rounded-xl border border-red-500/30 backdrop-blur-sm">
                {errorMsg}
              </p>
            </div>
          )}

          <div className="space-y-6">
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 md:py-4 rounded-xl bg-rajasthan-navy/50 border border-rajasthan-gold/20 text-amber-50 focus:border-rajasthan-gold focus:outline-none text-center text-base md:text-xl tracking-[0.5em] placeholder-amber-200/30 shadow-inner transition-all hover:border-rajasthan-gold/40"
            />
            
            <button type="submit" className="w-full btn-royal py-4 md:py-5 text-xs md:text-sm flex items-center justify-center gap-3 group/btn">
              Unlock the Vault
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="py-16 pt-24 min-h-screen bg-rajasthan-navy text-white bg-immersive-dust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 md:gap-4">
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <h1 className="text-3xl md:text-4xl font-ethnic font-bold text-rajasthan-gold drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">Admin Palace</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 text-rajasthan-red border border-rajasthan-red/40 bg-rajasthan-navy/50 px-3 md:px-4 py-2 rounded-full hover:bg-rajasthan-red/20 transition-all font-bold text-[10px] md:text-sm tracking-widest uppercase shadow-md">
              <LogOut size={14} md:size={16} /> Logout
            </button>
          </div>
          {/* Tab Navigation: Unified Dropdown for All Screens */}
          <div className="w-full md:w-64">
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-rajasthan-navy/90 border-2 border-rajasthan-gold/50 text-rajasthan-gold p-3 rounded-xl font-royal font-bold tracking-widest uppercase text-xs md:text-sm focus:border-rajasthan-gold focus:outline-none shadow-lg cursor-pointer transition-colors hover:border-rajasthan-gold"
            >
              <option value="events">Manage Events</option>
              <option value="members">Manage Team</option>
              <option value="alumni">Manage Alumni</option>
              <option value="sponsors">Bhamashah</option>
              <option value="partners">Partners</option>
              <option value="gallery">Gallery</option>
              <option value="albums">Albums</option>
            </select>
          </div>
        </div>

        {formData ? (
          <div className="dark-royal-glass p-5 md:p-8 rounded-3xl shadow-2xl border-t-4 border-l-4 border-rajasthan-gold/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rajasthan-gold/5 rounded-bl-full -z-10 blur-2xl group-hover:bg-rajasthan-gold/10 transition-colors duration-700"></div>
            <h2 className="text-xl md:text-2xl font-bold mb-6 font-ethnic text-rajasthan-gold tracking-widest drop-shadow-md">
              {formData._id ? 'Edit' : 'Add New'} {activeTab === 'events' ? 'Event' : activeTab === 'members' ? 'Member' : activeTab === 'alumni' ? 'Alumni' : activeTab === 'sponsors' ? 'Bhamashah' : activeTab === 'partners' ? 'Partner' : activeTab === 'gallery' ? 'Image' : 'Album'}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              {activeTab === 'events' && (
                <>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Title</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="Event Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Short Summary</label><textarea required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none min-h-[50px] placeholder-amber-200/30" placeholder="Brief summary" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">The Legend (Full Description)</label><textarea className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none min-h-[100px] placeholder-amber-200/30" placeholder="Complete details for the event page" value={formData.fullDescription || ''} onChange={e => setFormData({...formData, fullDescription: e.target.value})} /></div>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Royal Purpose</label><textarea className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none min-h-[60px] placeholder-amber-200/30" placeholder="Why is this event celebrated?" value={formData.purpose || ''} onChange={e => setFormData({...formData, purpose: e.target.value})} /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Date</label><input type="date" required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none [color-scheme:dark]" value={formData.date ? formData.date.split('T')[0] : ''} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Location</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="Venue" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
                  </div>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Type</label>
                    <select className="w-full p-3 bg-rajasthan-navy border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none" value={formData.type || 'upcoming'} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>
                  </div>
                  
                  {/* Additional Gallery Images Feature */}
                  <div className="p-4 bg-rajasthan-navy/40 border border-rajasthan-gold/30 rounded-xl">
                    <label className="block text-sm font-bold mb-2 font-royal text-amber-200/80 uppercase tracking-wider">Event Image Gallery</label>
                    <div className="flex flex-wrap gap-4 mb-4">
                      {formData.additionalImages && formData.additionalImages.map((img, i) => (
                        <div key={i} className="relative group w-20 h-20">
                          <img src={img} className="w-full h-full object-cover rounded shadow" />
                          <button type="button" onClick={() => setFormData({...formData, additionalImages: formData.additionalImages.filter((_, idx) => idx !== i)})} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                        </div>
                      ))}
                    </div>
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={handleAdditionalImageUpload} className="w-full text-sm text-amber-50 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-rajasthan-gold file:text-rajasthan-navy hover:file:bg-amber-400 cursor-pointer" />
                      {isUploading && <p className="text-xs text-rajasthan-gold mt-1 animate-pulse">Uploading...</p>}
                    </div>
                  </div>
                </>
              )}
              {activeTab === 'members' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Name</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="Full Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Role</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="Position" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Department</label>
                    <select className="w-full p-3 bg-rajasthan-navy border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none" value={formData.department || 'core'} onChange={e => setFormData({...formData, department: e.target.value})}>
                      <option value="core">Core</option>
                      <option value="design">Design</option>
                      <option value="tech">Tech</option>
                      <option value="management">Management</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">LinkedIn URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.socialLinks?.linkedin || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})} /></div>
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Instagram URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.socialLinks?.instagram || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})} /></div>
                  </div>
                </>
              )}
              {activeTab === 'alumni' && (
                <>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Name</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="Full Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                  <div>
                    <label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Year (Batch)</label>
                    <input required type="number" min="1990" max="2100" className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="e.g. 2024" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">LinkedIn URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.socialLinks?.linkedin || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})} /></div>
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Instagram URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.socialLinks?.instagram || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})} /></div>
                  </div>
                </>
              )}
              {activeTab === 'sponsors' && (
                <>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Name</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="Bhamashah Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">LinkedIn URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.socialLinks?.linkedin || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})} /></div>
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Instagram URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.socialLinks?.instagram || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})} /></div>
                  </div>
                </>
              )}
              {activeTab === 'partners' && (
                <>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Company Name</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="Company / Organisation Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Short Description</label><textarea required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none min-h-[80px] placeholder-amber-200/30" placeholder="1-2 lines about this partner" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Category</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="e.g. Technology, Finance" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} /></div>
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Website URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.website || ''} onChange={e => setFormData({...formData, website: e.target.value})} /></div>
                  </div>
                </>
              )}
              {activeTab === 'gallery' && (
                <>
                  <div>
                    <label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Event Name</label>
                    <input list="event-names" required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="e.g. Rajasthan Diwas 2025" value={formData.eventName || ''} onChange={e => setFormData({...formData, eventName: e.target.value})} />
                    <datalist id="event-names">
                      {[...new Set([...items.map(i => i.eventName), ...albums.map(a => a.eventName)])].filter(Boolean).map(name => <option key={name} value={name} />)}
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Year</label>
                    <input required type="number" min="2000" max="2100" className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} />
                  </div>
                </>
              )}
              {activeTab === 'albums' && (
                <>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Event Name</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="e.g. Rajasthan Diwas 2025" value={formData.eventName || ''} onChange={e => setFormData({...formData, eventName: e.target.value})} /></div>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Google Photos Link</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://photos.app.goo.gl/..." value={formData.googlePhotosLink || ''} onChange={e => setFormData({...formData, googlePhotosLink: e.target.value})} /></div>
                </>
              )}
              
              {activeTab !== 'albums' && (
                <div className="p-4 bg-rajasthan-navy/40 border-2 border-dashed border-rajasthan-gold/40 rounded-xl flex flex-col sm:flex-row items-center gap-6 hover:border-rajasthan-gold transition-colors">
                  {formData.imageUrl ? <img src={formData.imageUrl} className="w-20 h-20 rounded-xl object-cover shadow-[0_0_10px_rgba(212,175,55,0.3)] border border-rajasthan-gold/50" /> : <ImageIcon className="w-20 h-20 text-rajasthan-gold/40" />}
                  <div className="flex-grow w-full relative">
                    <label className="block text-sm font-bold mb-2 font-royal text-amber-200/80 uppercase tracking-wider text-center sm:text-left">
                      {activeTab === 'gallery' ? 'Upload Images (Multiple Allowed)' : 'Upload Portrait'}
                    </label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple={activeTab === 'gallery'} 
                      onChange={activeTab === 'gallery' ? handleBulkImageUpload : handleImageUpload} 
                      className="w-full text-xs md:text-sm text-amber-50 file:mr-2 md:file:mr-4 file:py-1 md:file:py-2 file:px-3 md:file:px-4 file:rounded-full file:border-0 file:text-[10px] md:file:text-sm file:font-bold file:bg-rajasthan-gold file:text-rajasthan-navy hover:file:bg-amber-400 cursor-pointer" 
                    />
                    {isUploading && <p className="text-xs md:text-sm text-rajasthan-gold mt-2 font-bold animate-pulse absolute sm:relative -bottom-6 sm:bottom-0">Uploading securely...</p>}
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && formData.images?.length > 0 && (
                <div className="flex flex-wrap gap-4 p-4 bg-rajasthan-navy/20 rounded-xl border border-rajasthan-gold/20 mb-6">
                  {formData.images.map((url, i) => (
                    <div key={i} className="relative group w-20 h-20">
                      <img src={url} className="w-full h-full object-cover rounded border border-rajasthan-gold/30" />
                      <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg hover:scale-110 transition-transform"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setFormData(null)} className="px-5 md:px-8 py-2 md:py-3 bg-rajasthan-navy/60 border border-rajasthan-gold/40 hover:bg-rajasthan-navy hover:border-rajasthan-gold text-amber-50 rounded-full font-bold transition-all shadow-md tracking-widest uppercase text-[10px] md:text-sm">Cancel</button>
                <button type="submit" disabled={isUploading || (activeTab === 'gallery' ? !formData.images?.length : (activeTab !== 'albums' && !formData.imageUrl))} className="btn-royal-solid !px-5 !md:px-8 !py-2 !md:py-3 !text-[10px] !md:text-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">Save to Archives</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="dark-royal-glass rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden border-t-4 border-l-4 border-rajasthan-gold/40">
            <div className="p-4 md:p-6 bg-rajasthan-navy/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-rajasthan-gold/30">
              <h2 className="text-lg md:text-2xl font-bold font-ethnic uppercase tracking-widest text-rajasthan-gold drop-shadow-md">Royal {activeTab} Roster</h2>
              <button 
                onClick={() => setFormData(
                  activeTab === 'events' ? { type: 'upcoming', date: new Date().toISOString() } : 
                  activeTab === 'members' ? { department: 'core', socialLinks: {} } : 
                  activeTab === 'alumni' ? { year: new Date().getFullYear().toString(), socialLinks: {} } :
                  activeTab === 'sponsors' ? { socialLinks: {} } :
                  activeTab === 'gallery' ? { eventName: '', year: new Date().getFullYear(), images: [] } :
                  activeTab === 'albums' ? { eventName: '', googlePhotosLink: '' } :
                  {}
                )}
                className="btn-royal py-2 px-6 text-[10px] md:text-sm w-full sm:w-auto"
              >
                <Plus size={16} className="mr-2 inline-block -mt-1" /> Add New
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-rajasthan-navy/60 uppercase text-xs tracking-widest font-royal text-amber-200/70 border-b border-rajasthan-gold/20">
                    {activeTab !== 'albums' && <th className="p-5">Portrait</th>}
                    <th className="p-5">
                      {activeTab === 'events' ? 'Title' : 
                       activeTab === 'gallery' ? 'Event Name' : 
                       activeTab === 'albums' ? 'Event Name' : 
                       'Name'}
                    </th>
                    <th className="p-5">
                      {activeTab === 'events' ? 'Location & Date' : 
                       activeTab === 'alumni' ? 'Batch Year' : 
                       activeTab === 'sponsors' ? 'Social' : 
                       activeTab === 'partners' ? 'Category' : 
                       activeTab === 'gallery' ? 'Year' :
                       activeTab === 'albums' ? 'Photos Link' :
                       'Role & Dept'}
                    </th>
                    <th className="p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rajasthan-gold/10">
                   {items.map(item => (
                    <tr key={item._id} className="hover:bg-rajasthan-navy/40 transition-colors group">
                      {activeTab !== 'albums' && (
                        <td className="p-5">
                          {(activeTab === 'gallery' ? item.images?.[0] : item.imageUrl) ? (
                            <img src={activeTab === 'gallery' ? item.images[0] : item.imageUrl} className="w-14 h-14 rounded-full object-cover shadow-[0_0_10px_rgba(212,175,55,0.2)] border-2 border-rajasthan-gold/30 group-hover:border-rajasthan-gold transition-colors" />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-rajasthan-navy/40 border-2 border-dashed border-rajasthan-gold/20 flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-rajasthan-gold/20" />
                            </div>
                          )}
                        </td>
                      )}
                      <td className="p-5 font-bold text-amber-50 text-lg">{item.eventName || item.title || item.name}</td>
                      <td className="p-5 text-sm text-amber-200/60 font-medium">
                        {activeTab === 'events' 
                          ? `${item.location} • ${new Date(item.date).toLocaleDateString()}` 
                          : activeTab === 'alumni' 
                          ? `Batch of ${item.year}` 
                          : activeTab === 'sponsors'
                          ? `${item.socialLinks?.linkedin ? 'LinkedIn ' : ''}${item.socialLinks?.instagram ? 'Instagram' : ''}` || 'No social links'
                          : activeTab === 'partners'
                          ? item.category || '—'
                          : activeTab === 'gallery'
                          ? item.year || '—'
                          : activeTab === 'albums'
                          ? <a href={item.googlePhotosLink} target="_blank" rel="noreferrer" className="text-rajasthan-gold hover:underline">Link</a>
                          : `${item.role} • ${(item.department || '').toUpperCase()}`}
                      </td>
                      <td className="p-5 text-right space-x-4">
                        <button onClick={() => setFormData(item)} className="text-rajasthan-gold hover:text-amber-300 transition-colors transform hover:scale-110 inline-block drop-shadow-md"><Edit size={22} /></button>
                        <button onClick={() => handleDelete(item._id)} className="text-rajasthan-red hover:text-red-400 transition-colors transform hover:scale-110 inline-block drop-shadow-md"><Trash2 size={22} /></button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && <tr><td colSpan="4" className="p-12 text-center text-amber-200/50 font-royal tracking-widest uppercase text-lg">The archives are empty. Add a new entry!</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
