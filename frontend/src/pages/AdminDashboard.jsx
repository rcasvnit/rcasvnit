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
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center rajasthani-bg p-4 flex-col">
        <h1 className="text-4xl text-rajasthan-navy font-bold font-ethnic mb-2">Restricted Area</h1>
        <p className="mb-8 text-gray-700 font-medium">Please enter the royal decree (password) to access.</p>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm border-t-8 border-rajasthan-navy">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-50 text-rajasthan-navy rounded-full flex items-center justify-center">
              <Lock size={32} />
            </div>
          </div>
          {errorMsg && <p className="text-red-600 text-center mb-4 font-bold bg-red-50 p-2 rounded">{errorMsg}</p>}
          <input 
            type="password" 
            placeholder="Super Secret Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 focus:border-rajasthan-navy focus:outline-none mb-6 text-center text-lg tracking-widest"
          />
          <button type="submit" className="w-full bg-rajasthan-navy text-rajasthan-gold font-bold py-3 px-8 rounded-full shadow-lg hover:-translate-y-1 transition-transform">
            Unlock Vault
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="py-16 pt-24 min-h-screen rajasthani-bg text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-ethnic font-bold text-rajasthan-navy">Admin Palace</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition-colors font-bold text-sm">
              <LogOut size={16} /> Logout
            </button>
          </div>
          <div className="flex bg-white rounded-full shadow-md overflow-hidden">
            <button 
              onClick={() => setActiveTab('events')} 
              className={`px-6 py-2 font-bold ${activeTab === 'events' ? 'bg-rajasthan-navy text-white' : 'hover:bg-gray-100'}`}
            >
              Manage Events
            </button>
            <button 
              onClick={() => setActiveTab('members')} 
              className={`px-6 py-2 font-bold ${activeTab === 'members' ? 'bg-rajasthan-navy text-white' : 'hover:bg-gray-100'}`}
            >
              Manage Team
            </button>
          </div>
        </div>

        {formData ? (
          <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-rajasthan-gold">
            <h2 className="text-2xl font-bold mb-6 font-ethnic text-rajasthan-navy">
              {formData._id ? 'Edit' : 'Add New'} {activeTab === 'events' ? 'Event' : 'Member'}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              {activeTab === 'events' && (
                <>
                  <div><label className="block text-sm font-bold mb-1">Title</label><input required className="w-full p-2 border rounded" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  <div><label className="block text-sm font-bold mb-1">Description</label><textarea required className="w-full p-2 border rounded" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1">Date</label><input type="date" required className="w-full p-2 border rounded" value={formData.date ? formData.date.split('T')[0] : ''} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
                    <div><label className="block text-sm font-bold mb-1">Location</label><input required className="w-full p-2 border rounded" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
                  </div>
                  <div><label className="block text-sm font-bold mb-1">Type</label>
                    <select className="w-full p-2 border rounded" value={formData.type || 'upcoming'} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>
                  </div>
                </>
              )}
              {activeTab === 'members' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1">Name</label><input required className="w-full p-2 border rounded" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                    <div><label className="block text-sm font-bold mb-1">Role</label><input required className="w-full p-2 border rounded" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Department</label>
                    <select className="w-full p-2 border rounded" value={formData.department || 'core'} onChange={e => setFormData({...formData, department: e.target.value})}>
                      <option value="core">Core</option>
                      <option value="design">Design</option>
                      <option value="tech">Tech</option>
                      <option value="management">Management</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-bold mb-1">LinkedIn URL</label><input className="w-full p-2 border rounded" value={formData.socialLinks?.linkedin || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})} /></div>
                    <div><label className="block text-sm font-bold mb-1">Instagram URL</label><input className="w-full p-2 border rounded" value={formData.socialLinks?.instagram || ''} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})} /></div>
                  </div>
                </>
              )}
              
              <div className="p-4 bg-gray-50 border rounded-xl flex items-center gap-4">
                {formData.imageUrl ? <img src={formData.imageUrl} className="w-16 h-16 rounded object-cover" /> : <ImageIcon className="w-16 h-16 text-gray-400" />}
                <div className="flex-grow">
                  <label className="block text-sm font-bold mb-1">Upload Image securely</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
                  {isUploading && <p className="text-sm text-rajasthan-orange mt-1 font-bold">Encrypted Upload in progress...</p>}
                </div>
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={() => setFormData(null)} className="px-6 py-2 bg-gray-200 rounded font-bold">Cancel</button>
                <button type="submit" disabled={isUploading || !formData.imageUrl} className="px-6 py-2 bg-rajasthan-navy text-white rounded font-bold">Save Content</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-t-4 border-rajasthan-gold">
            <div className="p-6 bg-gray-50 flex justify-between items-center border-b">
              <h2 className="text-xl font-bold uppercase tracking-wider text-rajasthan-navy">Registered {activeTab}</h2>
              <button 
                onClick={() => setFormData(activeTab === 'events' ? { type: 'upcoming', date: new Date().toISOString() } : { department: 'core', socialLinks: {} })}
                className="flex items-center gap-2 bg-rajasthan-navy text-rajasthan-gold px-4 py-2 rounded shadow hover:bg-rajasthan-blue"
              >
                <Plus size={18} /> Add New
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 uppercase text-xs tracking-wider">
                    <th className="p-4 border-b">Image</th>
                    <th className="p-4 border-b">{activeTab === 'events' ? 'Title' : 'Name'}</th>
                    <th className="p-4 border-b">{activeTab === 'events' ? 'Location Date' : 'Role & Dept'}</th>
                    <th className="p-4 border-b text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item._id} className="hover:bg-gray-50 border-b last:border-0">
                      <td className="p-4"><img src={item.imageUrl} className="w-12 h-12 rounded-full object-cover shadow border border-gray-200" /></td>
                      <td className="p-4 font-bold text-gray-800">{item.title || item.name}</td>
                      <td className="p-4 text-sm text-gray-600">
                        {activeTab === 'events' ? `${item.location} • ${new Date(item.date).toLocaleDateString()}` : `${item.role} • ${(item.department || '').toUpperCase()}`}
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <button onClick={() => setFormData(item)} className="text-blue-600 hover:text-blue-900"><Edit size={20} /></button>
                        <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-800"><Trash2 size={20} /></button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-gray-500">No data found. Add some!</td></tr>}
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
