let orders = [
  { id: '#1048', room: 'Room 304', guest: 'Emma Wilson · 2 guests', items: 'Grilled salmon, Caesar salad', status: 'New', elapsed: '2 min', total: '£36.00', allergy: 'No nuts', station: 'Hot kitchen - Chef Marco' },
  { id: '#1047', room: 'Table 12', guest: 'Walk-in · 2 guests', items: 'Truffle mushroom risotto', status: 'Preparing', elapsed: '8 min', total: '£19.00', allergy: 'Vegetarian', station: 'Cold kitchen - Chef Priya' },
  { id: '#1046', room: 'Room 218', guest: 'Liam Patel · 1 guest', items: 'Club sandwich, fresh juice', status: 'Ready', elapsed: '12 min', total: '£16.00', allergy: 'None', station: 'Pastry & cold - Chef Elena' },
  { id: '#1045', room: 'Table 06', guest: 'Sofia Rossi · 3 guests', items: 'Burrata, margherita pizza', status: 'Preparing', elapsed: '14 min', total: '£29.00', allergy: 'None', station: 'Hot kitchen - Chef Marco' },
  { id: '#1044', room: 'Room 512', guest: 'James Chen · 2 guests', items: 'Seared sea bass, fries', status: 'Delayed', elapsed: '24 min', total: '£26.00', allergy: 'Gluten-free', station: 'Hot kitchen - Chef Marco' },
  { id: '#1043', room: 'Table 08', guest: 'Oliver Brown · 1 guest', items: 'Lemon tart, herbal tea', status: 'Preparing', elapsed: '11 min', total: '£12.50', allergy: 'Contains dairy', station: 'Pastry - Chef Elena' },
  { id: '#1042', room: 'Room 406', guest: 'Amalia Patel · 1 guest', items: 'Caesar salad, fresh juice', status: 'Ready', elapsed: '9 min', total: '£15.00', allergy: 'None', station: 'Cold kitchen - Chef Priya' }
];

let selectedOrderId = '#1048';
let currentOrderFilter = 'All';

let menuItems = [
  { id: 1, name: 'Grilled salmon', category: 'Main course · Seafood', price: '£24', stock: 'Limited · 6 portions left', available: true, img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Truffle mushroom risotto', category: 'Main course · Vegetarian', price: '£19', stock: 'Available · 24 portions', available: true, img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Seared sea bass', category: 'Main course · Seafood', price: '£26', stock: 'Unavailable · Restock needed', available: false, img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Caesar salad', category: 'Starter · Salad', price: '£12', stock: 'Available · 32 portions', available: true, img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Club sandwich', category: 'Light bites · Sandwich', price: '£16', stock: 'Available · 18 portions', available: true, img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Margherita pizza', category: 'Main course · Vegetarian', price: '£17', stock: 'Available · 20 portions', available: true, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80' }
];

let inventoryItems = [
  { sku: 'ST-001', barcode: '89012345001', name: 'Atlantic salmon', category: 'Seafood · Chilled', qty: '1.2 kg', expiry: '2026-11-16', supplier: 'Coast & Catch', status: 'Low · Expiring soon' },
  { sku: 'ST-002', barcode: '89012345002', name: 'Sea bass fillets', category: 'Seafood · Chilled', qty: '1.2 kg', expiry: '2026-11-15', supplier: 'Coast & Catch', status: 'Low · Expiring soon' },
  { sku: 'ST-003', barcode: '89012345003', name: 'Arborio rice', category: 'Dry goods · Pantry', qty: '18 kg', expiry: '2027-04-10', supplier: 'Pantry Partners', status: 'Healthy' },
  { sku: 'ST-004', barcode: '89012345004', name: 'Romaine lettuce', category: 'Produce · Chilled', qty: '24 heads', expiry: '2026-11-16', supplier: 'Fresh & Co.', status: 'Healthy' },
  { sku: 'ST-005', barcode: '89012345005', name: 'Fresh cream', category: 'Dairy · Chilled', qty: '2 litres', expiry: '2026-11-15', supplier: 'Fresh & Co.', status: 'Low · Reorder' },
  { sku: 'ST-006', barcode: '89012345006', name: 'Truffle oil', category: 'Dry goods · Pantry', qty: '6 bottles', expiry: '2027-08-20', supplier: 'Pantry Partners', status: 'Healthy' }
];

const roomsData = [
  { num: 'Room 301', status: 'Available', guest: 'Ready for check-in' },
  { num: 'Room 302', status: 'Occupied', guest: 'Amalia Patel' },
  { num: 'Room 303', status: 'Occupied', guest: 'Emma Wilson' },
  { num: 'Room 304', status: 'Occupied', guest: 'James Chen' },
  { num: 'Room 305', status: 'Maintenance', guest: 'AC inspection' },
  { num: 'Room 306', status: 'Occupied', guest: 'Sofia Rossi' },
  { num: 'Room 307', status: 'Occupied', guest: 'Oliver Brown' },
  { num: 'Room 308', status: 'Occupied', guest: 'Lucas Martin' },
  { num: 'Room 309', status: 'Available', guest: 'Ready for check-in' },
  { num: 'Room 310', status: 'Occupied', guest: 'Liam Patel' },
  { num: 'Room 311', status: 'Occupied', guest: 'Amalia Patel' },
  { num: 'Room 312', status: 'Occupied', guest: 'Emma Wilson' },
  { num: 'Room 313', status: 'Available', guest: 'Ready for check-in' },
  { num: 'Room 314', status: 'Occupied', guest: 'Amalia Patel' },
  { num: 'Room 315', status: 'Occupied', guest: 'Emma Wilson' }
];

// --- AUTHENTICATION (Connected to MySQL Backend) ---
async function handleRegister(e) {
  e.preventDefault();
  const full_name = document.getElementById('regFullName').value;
  const property_name = document.getElementById('regProperty').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, property_name, email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      alert('Registration error: ' + (data.error || 'Failed'));
      return;
    }
    localStorage.setItem('marlow_token', data.token);
    alert('Account created & saved to MySQL!');
    switchView('hotel-overview');
  } catch (err) {
    alert('Server offline: ' + err.message);
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      alert('Login failed: ' + (data.error || 'Invalid credentials'));
      return;
    }
    localStorage.setItem('marlow_token', data.token);
    switchView('hotel-overview');
  } catch (err) {
    alert('Server offline: ' + err.message);
  }
}

async function syncFromBackend() {
  try {
    const [ordersRes, menuRes, invRes] = await Promise.all([
      fetch('/api/orders'),
      fetch('/api/menu'),
      fetch('/api/inventory')
    ]);

    if (ordersRes.ok) {
      const dbOrders = await ordersRes.json();
      if (Array.isArray(dbOrders) && dbOrders.length) {
        orders = dbOrders.map(row => ({
          id: row.order_id,
          room: row.room_or_table,
          guest: row.guest_name,
          items: row.items_summary,
          status: row.status,
          elapsed: 'Live DB',
          total: `£${Number(row.total_amount || 0).toFixed(2)}`,
          allergy: row.allergy_alert || 'None',
          station: row.station || 'Hot kitchen'
        }));
        selectedOrderId = orders[0].id;
      }
    }

    if (menuRes.ok) {
      const dbMenu = await menuRes.json();
      if (Array.isArray(dbMenu) && dbMenu.length) {
        const defaultImgs = [
          'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80'
        ];
        menuItems = dbMenu.map((row, i) => ({
          id: row.item_id,
          name: row.name,
          category: row.category + (row.dietary_tag ? ' · ' + row.dietary_tag : ''),
          price: `£${Number(row.price || 0).toFixed(0)}`,
          stock: row.is_available ? `${row.portions_left ?? 10} portions` : 'Sold out · Restock needed',
          available: Boolean(row.is_available),
          img: row.image_url || defaultImgs[i % defaultImgs.length]
        }));
      }
    }

    if (invRes.ok) {
      const dbInv = await invRes.json();
      if (Array.isArray(dbInv) && dbInv.length) {
        inventoryItems = dbInv.map(row => {
          const qtyNum = Number(row.quantity_on_hand || 0);
          const reorderNum = Number(row.reorder_level || 0);
          const isLow = qtyNum <= reorderNum;
          return {
            sku: row.sku,
            barcode: row.barcode,
            name: row.ingredient_name,
            category: row.category_storage,
            qty: `${qtyNum} ${row.unit || ''}`.trim(),
            expiry: String(row.expiry_date).slice(0, 10),
            supplier: row.supplier,
            status: isLow ? 'Low · Reorder' : 'Healthy'
          };
        });
      }
    }
  } catch (err) {
    console.warn('Backend offline, using local demo data:', err.message);
  }

  renderOrders();
  renderMenu();
  renderInventory();
  renderRooms();
}

function switchView(viewId, el) {
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById('view-' + viewId);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-item, .sub-nav li').forEach(item => {
    item.classList.remove('active', 'active-sub');
  });

  if (el) {
    if (el.parentElement && el.parentElement.classList.contains('sub-nav')) {
      el.classList.add('active-sub');
    } else {
      el.classList.add('active');
    }
  }

  const breadcrumbs = {
    'create-account': 'Authentication / Create account',
    'login': 'Authentication / Log in',
    'hotel-overview': 'Operations / Hotel overview',
    'reservations': 'Operations / Reservations',
    'rooms-guests': 'Operations / Rooms & guests',
    'kitchen-overview': 'Food management / Kitchen overview',
    'meal-orders': 'Food management / Meal orders',
    'menu-management': 'Food management / Menu management',
    'meal-planning': 'Food management / Meal planning',
    'inventory': 'Food management / Inventory & waste',
    'housekeeping': 'Operations / Housekeeping',
    'team-shifts': 'Operations / Team & shifts',
    'reports': 'Operations / Reports',
    'settings': 'Workspace / Settings',
    'help-support': 'Workspace / Help & support'
  };
  const bc = document.getElementById('breadcrumb-current');
  if (bc) bc.textContent = breadcrumbs[viewId] || 'Operations';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getStatusBadgeClass(status) {
  if (status === 'New') return 'badge-new';
  if (status === 'Preparing') return 'badge-prep';
  if (status === 'Ready') return 'badge-ready';
  return 'badge-delayed';
}

function getNextActionLabel(status) {
  if (status === 'New') return 'Accept order';
  if (status === 'Preparing') return 'Mark ready';
  if (status === 'Ready') return 'Dispatch';
  return 'Resolve delay';
}

function renderOrders(searchQuery = '') {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filtered = orders.filter(o => {
    const matchesFilter = currentOrderFilter === 'All' || o.status === currentOrderFilter;
    const matchesSearch = o.id.toLowerCase().includes(searchQuery) ||
                          o.room.toLowerCase().includes(searchQuery) ||
                          o.items.toLowerCase().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  filtered.forEach(order => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.onclick = () => selectOrder(order.id);
    tr.innerHTML = `
      <td><strong>${order.id}</strong></td>
      <td>${order.room}</td>
      <td>${order.items}</td>
      <td><span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span></td>
      <td>${order.elapsed}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); advanceOrder('${order.id}')">
          ${getNextActionLabel(order.status)}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  const ordersStat = document.getElementById('ordersActiveStat');
  const kitchenStat = document.getElementById('kitchenActiveCount');
  if (ordersStat) ordersStat.textContent = orders.length;
  if (kitchenStat) kitchenStat.textContent = orders.length;
  renderSelectedOrderDetail();
}

function selectOrder(id) {
  selectedOrderId = id;
  renderSelectedOrderDetail();
}

function renderSelectedOrderDetail() {
  const order = orders.find(o => o.id === selectedOrderId) || orders[0];
  if (!order) return;

  document.getElementById('detailOrderId').textContent = 'Order ' + order.id;
  const badge = document.getElementById('detailOrderBadge');
  badge.textContent = order.status;
  badge.className = 'badge ' + getStatusBadgeClass(order.status);

  document.getElementById('detailRoom').textContent = order.room;
  document.getElementById('detailGuest').textContent = order.guest;
  document.getElementById('detailAllergy').innerHTML = `<strong>Allergy alert: ${order.allergy}</strong><br/>Use a clean preparation area and confirm ingredients before sending.`;
  document.getElementById('detailItemsList').innerHTML = order.items.split(',').map(i => `• 1 × ${i.trim()}`).join('<br/>');
  document.getElementById('detailTotal').textContent = order.total;
  document.getElementById('detailStation').textContent = order.station;
  document.getElementById('detailActionBtn').textContent = getNextActionLabel(order.status);
}

async function advanceOrder(id) {
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return;

  const current = orders[idx].status;
  const encodedId = encodeURIComponent(id);

  try {
    if (current === 'New' || current === 'Delayed') {
      orders[idx].status = 'Preparing';
      await fetch(`/api/orders/${encodedId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Preparing' })
      });
    } else if (current === 'Preparing') {
      orders[idx].status = 'Ready';
      await fetch(`/api/orders/${encodedId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Ready' })
      });
    } else if (current === 'Ready') {
      orders.splice(idx, 1);
      if (orders.length > 0) selectedOrderId = orders[0].id;
      await fetch(`/api/orders/${encodedId}`, { method: 'DELETE' });
    }
  } catch (err) {
    console.warn('Order update saved locally:', err.message);
  }

  const q = (document.getElementById('globalSearch')?.value || '').toLowerCase();
  renderOrders(q);
}

function advanceSelectedOrder() { advanceOrder(selectedOrderId); }

function filterOrders(status) {
  currentOrderFilter = status;
  const q = (document.getElementById('globalSearch')?.value || '').toLowerCase();
  renderOrders(q);
}

async function createNewOrder(e) {
  e.preventDefault();
  const room = document.getElementById('newOrderRoom').value;
  const guest = document.getElementById('newOrderGuest').value;
  const [items, price] = document.getElementById('newOrderDish').value.split('|');
  const allergy = document.getElementById('newOrderAllergy').value || 'None';
  const nextNum = '#10' + (49 + orders.length);

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: nextNum,
        room_or_table: room,
        guest_name: guest,
        items_summary: items,
        allergy_alert: allergy,
        station: 'Hot kitchen',
        total_amount: Number(price)
      })
    });
    if (res.ok) {
      closeModal('newOrderModal');
      e.target.reset();
      await syncFromBackend();
      switchView('meal-orders');
      return;
    }
  } catch (err) {
    console.warn('Backend POST failed, adding locally:', err.message);
  }

  orders.unshift({
    id: nextNum,
    room,
    guest,
    items,
    status: 'New',
    elapsed: '1 min',
    total: '£' + price,
    allergy,
    station: 'Hot kitchen - Chef Marco'
  });

  selectedOrderId = nextNum;
  closeModal('newOrderModal');
  e.target.reset();
  renderOrders();
  switchView('meal-orders');
}

function renderMenu(searchQuery = '') {
  const grid = document.getElementById('menuGalleryGrid');
  if (!grid) return;
  grid.innerHTML = '';
  let availableCount = 0;

  menuItems.filter(m => m.name.toLowerCase().includes(searchQuery)).forEach(dish => {
    if (dish.available) availableCount++;
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.innerHTML = `
      <img class="dish-img" src="${dish.img}" alt="${dish.name}" />
      <div class="dish-body">
        <div>
          <div class="dish-top">
            <span class="dish-title">${dish.name}</span>
            <span class="dish-price">${dish.price}</span>
          </div>
          <div class="dish-meta">${dish.category}<br/>${dish.available ? dish.stock : 'Sold out · Restock needed'}</div>
        </div>
        <div class="dish-footer">
          <span class="badge ${dish.available ? 'badge-ready' : 'badge-delayed'}">${dish.available ? 'Available' : 'Sold out'}</span>
          <label class="switch">
            <input type="checkbox" ${dish.available ? 'checked' : ''} onchange="toggleDish(${dish.id})" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  const menuCountEl = document.getElementById('menuAvailCount');
  if (menuCountEl) menuCountEl.textContent = availableCount;
}

async function toggleDish(id) {
  const dish = menuItems.find(d => d.id === id);
  if (!dish) return;
  dish.available = !dish.available;

  try {
    await fetch(`/api/menu/${id}/toggle`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_available: dish.available })
    });
  } catch (err) {
    console.warn('Menu toggle saved locally:', err.message);
  }

  const q = (document.getElementById('globalSearch')?.value || '').toLowerCase();
  renderMenu(q);
}

function renderInventory(searchQuery = '') {
  const tbody = document.getElementById('inventoryTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  let lowCount = 0;

  inventoryItems.filter(i => i.name.toLowerCase().includes(searchQuery) || i.sku.toLowerCase().includes(searchQuery)).forEach((item, index) => {
    const isAlert = item.status !== 'Healthy';
    if (isAlert) lowCount++;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.sku}</strong><br/><span style="font-size:11px; color:var(--text-muted)">${item.barcode}</span></td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.qty}</td>
      <td>${item.expiry}</td>
      <td>${item.supplier}</td>
      <td><span class="badge ${isAlert ? 'badge-delayed' : 'badge-ready'}">${item.status}</span></td>
      <td><button class="btn btn-outline btn-sm" onclick="restockItem(${index})">Restock</button></td>
    `;
    tbody.appendChild(tr);
  });

  const lowEl = document.getElementById('lowStockCount');
  if (lowEl) lowEl.textContent = lowCount;
}

async function restockItem(index) {
  const item = inventoryItems[index];
  if (!item) return;

  try {
    await fetch(`/api/inventory/${encodeURIComponent(item.sku)}/restock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity_on_hand: 12 })
    });
    await syncFromBackend();
    return;
  } catch (err) {
    console.warn('Restock saved locally:', err.message);
  }

  inventoryItems[index].status = 'Healthy';
  inventoryItems[index].qty = '12 kg / units';
  renderInventory();
}

async function addInventoryItem(e) {
  e.preventDefault();
  const sku = document.getElementById('stockSku').value;
  const barcode = document.getElementById('stockBarcode').value;
  const name = document.getElementById('stockName').value;
  const category = document.getElementById('stockCategory').value;
  const rawQty = document.getElementById('stockQty').value;
  const expiry = document.getElementById('stockExpiry').value;
  const supplier = document.getElementById('stockSupplier').value;
  const parsedQty = parseFloat(rawQty) || 1;
  const unit = rawQty.replace(/[0-9.\s]/g, '') || 'units';

  try {
    const res = await fetch('/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sku,
        barcode,
        ingredient_name: name,
        category_storage: category,
        quantity_on_hand: parsedQty,
        unit,
        reorder_level: 2,
        expiry_date: expiry,
        supplier
      })
    });
    if (res.ok) {
      closeModal('addStockModal');
      e.target.reset();
      await syncFromBackend();
      return;
    }
  } catch (err) {
    console.warn('Inventory POST failed, adding locally:', err.message);
  }

  inventoryItems.unshift({
    sku,
    barcode,
    name,
    category,
    qty: rawQty,
    expiry,
    supplier,
    status: 'Healthy'
  });
  closeModal('addStockModal');
  e.target.reset();
  renderInventory();
}

function renderRooms() {
  const grid = document.getElementById('roomsGrid');
  if (!grid) return;
  grid.innerHTML = roomsData.map(r => `
    <div class="room-tile ${r.status.toLowerCase()}">
      <strong style="font-size:14px; display:block; margin-bottom:4px;">${r.num}</strong>
      <span style="font-size:11.5px; color:var(--text-secondary); display:block;">${r.status}</span>
      <span style="font-size:11.5px; color:var(--text-muted);">${r.guest}</span>
    </div>
  `).join('');
}

function handleGlobalSearch() {
  const q = (document.getElementById('globalSearch')?.value || '').toLowerCase();
  renderOrders(q);
  renderMenu(q);
  renderInventory(q);
}

function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

function toggleMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;
  const isOpen = sidebar.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  syncFromBackend();

  document.querySelectorAll('.sidebar .nav-item, .sidebar .sub-nav li').forEach(el => {
    el.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      if (!this.dataset.fallbackApplied) {
        this.dataset.fallbackApplied = '1';
        this.style.background = 'linear-gradient(135deg, #1E4635 0%, #3B6E57 100%)';
        this.style.minHeight = this.classList.contains('hero-banner') ? '150px' : '160px';
      }
    });
  });
});
