import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Image as ImageIcon, Lock, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (token) fetchItems();
  }, [activeTab, token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
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
      const res = await fetch(`http://localhost:5000/api/${activeTab}`);
      const data = await res.json();
      setItems(data);
    } catch (err) { console.error(err); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('image', file);
    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataObj
      });
      if (res.status === 401 || res.status === 403) return handleLogout();
      const data = await res.json();
      setFormData({ ...formData, imageUrl: data.imageUrl });
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
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj
      });
      if (res.status === 401 || res.status === 403) return handleLogout();
      const data = await res.json();
      setFormData({ ...formData, additionalImages: [...(formData.additionalImages || []), data.imageUrl] });
    } catch (err) {
      console.error(err);
      alert('Error uploading additional image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isNew = !formData._id;
    const url = `http://localhost:5000/api/${activeTab}${isNew ? '' : `/${formData._id}`}`;
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
      const res = await fetch(`http://localhost:5000/api/${activeTab}/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) return handleLogout();
      fetchItems();
    } catch (err) { console.error(err); }
  };

  if (!token) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-rajasthan-navy text-white bg-immersive-dust p-4 flex-col">
        <h1 className="text-4xl text-rajasthan-gold font-bold font-ethnic mb-2 drop-shadow-md">Restricted Area</h1>
        <p className="mb-8 text-amber-200/80 font-medium font-royal tracking-widest uppercase">Please enter the royal decree (password) to access.</p>
        <form onSubmit={handleLogin} className="dark-royal-glass p-8 rounded-3xl shadow-[0_0_30px_rgba(212,175,55,0.2)] w-full max-w-sm border-t-4 border-b-4 border-rajasthan-gold transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rajasthan-gold/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-rajasthan-navy/80 border border-rajasthan-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.4)] text-rajasthan-gold rounded-full flex items-center justify-center">
              <Lock size={32} />
            </div>
          </div>
          {errorMsg && <p className="text-red-400 text-center mb-4 font-bold bg-red-900/40 p-2 rounded border border-red-500/50">{errorMsg}</p>}
          <input 
            type="password" 
            placeholder="Super Secret Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-rajasthan-navy/50 border border-rajasthan-gold/30 text-amber-50 focus:border-rajasthan-gold focus:outline-none mb-6 text-center text-lg tracking-widest placeholder-amber-200/50 shadow-inner"
          />
          <button type="submit" className="w-full btn-royal">
            Unlock Vault
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="py-16 pt-24 min-h-screen bg-rajasthan-navy text-white bg-immersive-dust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-ethnic font-bold text-rajasthan-gold drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">Admin Palace</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 text-rajasthan-red border border-rajasthan-red/40 bg-rajasthan-navy/50 px-4 py-2 rounded-full hover:bg-rajasthan-red/20 transition-all font-bold text-sm tracking-widest uppercase shadow-md">
              <LogOut size={16} /> Logout
            </button>
          </div>
          <div className="flex bg-rajasthan-navy/80 border border-rajasthan-gold/40 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.1)] p-1 backdrop-blur-md">
            <button 
              onClick={() => setActiveTab('events')} 
              className={`px-6 py-2 font-bold rounded-full transition-all duration-300 font-royal tracking-widest uppercase text-sm ${activeTab === 'events' ? 'bg-gradient-to-r from-rajasthan-gold to-yellow-500 text-rajasthan-navy shadow-md' : 'text-amber-50 hover:text-rajasthan-gold'}`}
            >
              Manage Events
            </button>
            <button 
              onClick={() => setActiveTab('members')} 
              className={`px-6 py-2 font-bold rounded-full transition-all duration-300 font-royal tracking-widest uppercase text-sm ${activeTab === 'members' ? 'bg-gradient-to-r from-rajasthan-gold to-yellow-500 text-rajasthan-navy shadow-md' : 'text-amber-50 hover:text-rajasthan-gold'}`}
            >
              Manage Team
            </button>
            <button 
              onClick={() => setActiveTab('alumni')} 
              className={`px-6 py-2 font-bold rounded-full transition-all duration-300 font-royal tracking-widest uppercase text-sm ${activeTab === 'alumni' ? 'bg-gradient-to-r from-rajasthan-gold to-yellow-500 text-rajasthan-navy shadow-md' : 'text-amber-50 hover:text-rajasthan-gold'}`}
            >
              Manage Alumni
            </button>
            <button 
              onClick={() => setActiveTab('sponsors')} 
              className={`px-6 py-2 font-bold rounded-full transition-all duration-300 font-royal tracking-widest uppercase text-sm ${activeTab === 'sponsors' ? 'bg-gradient-to-r from-rajasthan-gold to-yellow-500 text-rajasthan-navy shadow-md' : 'text-amber-50 hover:text-rajasthan-gold'}`}
            >
              Bhamashah
            </button>
            <button 
              onClick={() => setActiveTab('partners')} 
              className={`px-6 py-2 font-bold rounded-full transition-all duration-300 font-royal tracking-widest uppercase text-sm ${activeTab === 'partners' ? 'bg-gradient-to-r from-rajasthan-gold to-yellow-500 text-rajasthan-navy shadow-md' : 'text-amber-50 hover:text-rajasthan-gold'}`}
            >
              Partners
            </button>
          </div>
        </div>

        {formData ? (
          <div className="dark-royal-glass p-8 rounded-3xl shadow-2xl border-t-4 border-l-4 border-rajasthan-gold/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rajasthan-gold/5 rounded-bl-full -z-10 blur-2xl group-hover:bg-rajasthan-gold/10 transition-colors duration-700"></div>
            <h2 className="text-2xl font-bold mb-6 font-ethnic text-rajasthan-gold tracking-widest drop-shadow-md">
              {formData._id ? 'Edit' : 'Add New'} {activeTab === 'events' ? 'Event' : activeTab === 'members' ? 'Member' : activeTab === 'alumni' ? 'Alumni' : activeTab === 'sponsors' ? 'Bhamashah' : 'Partner'}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              {activeTab === 'events' && (
                <>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Title</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="Event Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Short Summary</label><textarea required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none min-h-[50px] placeholder-amber-200/30" placeholder="Brief summary" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">The Legend (Full Description)</label><textarea className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none min-h-[100px] placeholder-amber-200/30" placeholder="Complete details for the event page" value={formData.fullDescription || ''} onChange={e => setFormData({...formData, fullDescription: e.target.value})} /></div>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Royal Purpose</label><textarea className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none min-h-[60px] placeholder-amber-200/30" placeholder="Why is this event celebrated?" value={formData.purpose || ''} onChange={e => setFormData({...formData, purpose: e.target.value})} /></div>
                  <div className="grid grid-cols-2 gap-4">
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
                  <div className="grid grid-cols-2 gap-4">
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
                  <div className="grid grid-cols-2 gap-4">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">LinkedIn URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.socialLinks?.linkedin || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})} /></div>
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Instagram URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.socialLinks?.instagram || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})} /></div>
                  </div>
                </>
              )}
              {activeTab === 'sponsors' && (
                <>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Name</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="Bhamashah Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">LinkedIn URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.socialLinks?.linkedin || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})} /></div>
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Instagram URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.socialLinks?.instagram || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})} /></div>
                  </div>
                </>
              )}
              {activeTab === 'partners' && (
                <>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Company Name</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="Company / Organisation Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                  <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Short Description</label><textarea required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none min-h-[80px] placeholder-amber-200/30" placeholder="1-2 lines about this partner" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Category</label><input required className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="e.g. Technology, Finance" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} /></div>
                    <div><label className="block text-sm font-bold mb-1 font-royal text-amber-200/80 uppercase tracking-wider">Website URL</label><input className="w-full p-3 bg-rajasthan-navy/50 border border-rajasthan-gold/30 rounded-xl text-white focus:border-rajasthan-gold focus:outline-none placeholder-amber-200/30" placeholder="https://" value={formData.website || ''} onChange={e => setFormData({...formData, website: e.target.value})} /></div>
                  </div>
                </>
              )}
              
              <div className="p-4 bg-rajasthan-navy/40 border-2 border-dashed border-rajasthan-gold/40 rounded-xl flex items-center gap-6 hover:border-rajasthan-gold transition-colors">
                {formData.imageUrl ? <img src={formData.imageUrl} className="w-20 h-20 rounded-xl object-cover shadow-[0_0_10px_rgba(212,175,55,0.3)] border border-rajasthan-gold/50" /> : <ImageIcon className="w-20 h-20 text-rajasthan-gold/40" />}
                <div className="flex-grow relative">
                  <label className="block text-sm font-bold mb-2 font-royal text-amber-200/80 uppercase tracking-wider">Upload Portrait</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-amber-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-rajasthan-gold file:text-rajasthan-navy hover:file:bg-amber-400 cursor-pointer" />
                  {isUploading && <p className="text-sm text-rajasthan-gold mt-2 font-bold animate-pulse absolute -bottom-6">Uploading securely to vault...</p>}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setFormData(null)} className="px-8 py-3 bg-rajasthan-navy/60 border border-rajasthan-gold/40 hover:bg-rajasthan-navy hover:border-rajasthan-gold text-amber-50 rounded-full font-bold transition-all shadow-md tracking-widest uppercase">Cancel</button>
                <button type="submit" disabled={isUploading || !formData.imageUrl} className="btn-royal-solid disabled:opacity-50 disabled:cursor-not-allowed">Save to Archives</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="dark-royal-glass rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden border-t-4 border-l-4 border-rajasthan-gold/40">
            <div className="p-6 bg-rajasthan-navy/80 flex justify-between items-center border-b border-rajasthan-gold/30">
              <h2 className="text-2xl font-bold font-ethnic uppercase tracking-widest text-rajasthan-gold drop-shadow-md">Royal {activeTab} Roster</h2>
              <button 
                onClick={() => setFormData(
                  activeTab === 'events' ? { type: 'upcoming', date: new Date().toISOString() } : 
                  activeTab === 'members' ? { department: 'core', socialLinks: {} } : 
                  activeTab === 'alumni' ? { year: new Date().getFullYear().toString(), socialLinks: {} } :
                  activeTab === 'sponsors' ? { socialLinks: {} } :
                  {}
                )}
                className="btn-royal py-2 px-6 text-sm"
              >
                <Plus size={18} className="mr-2" /> Add New
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-rajasthan-navy/60 uppercase text-xs tracking-widest font-royal text-amber-200/70 border-b border-rajasthan-gold/20">
                    <th className="p-5">Portrait</th>
                    <th className="p-5">{activeTab === 'events' ? 'Title' : 'Name'}</th>
                    <th className="p-5">{activeTab === 'events' ? 'Location & Date' : activeTab === 'alumni' ? 'Batch Year' : activeTab === 'sponsors' ? 'Social' : activeTab === 'partners' ? 'Category' : 'Role & Dept'}</th>
                    <th className="p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rajasthan-gold/10">
                  {items.map(item => (
                    <tr key={item._id} className="hover:bg-rajasthan-navy/40 transition-colors group">
                      <td className="p-5"><img src={item.imageUrl} className="w-14 h-14 rounded-full object-cover shadow-[0_0_10px_rgba(212,175,55,0.2)] border-2 border-rajasthan-gold/30 group-hover:border-rajasthan-gold transition-colors" /></td>
                      <td className="p-5 font-bold text-amber-50 text-lg">{item.title || item.name}</td>
                      <td className="p-5 text-sm text-amber-200/60 font-medium">
                        {activeTab === 'events' 
                          ? `${item.location} • ${new Date(item.date).toLocaleDateString()}` 
                          : activeTab === 'alumni' 
                          ? `Batch of ${item.year}` 
                          : activeTab === 'sponsors'
                          ? `${item.socialLinks?.linkedin ? 'LinkedIn ' : ''}${item.socialLinks?.instagram ? 'Instagram' : ''}` || 'No social links'
                          : activeTab === 'partners'
                          ? item.category || '—'
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
