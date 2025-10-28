# 🏗️ Design & Architecture Decisions Wiki

> Concise documentation of key decisions, trade-offs, and future improvements

---

## 📋 **Challenge Requirements**

### **1. Sorting Functionality**

#### **Decision: Custom `useSort` Hook**
```typescript
// src/hooks/useSort/useSort.ts
const { sortedData, sortConfig, handleSort } = useSort(data);
```

**Why:**
- Encapsulates sorting logic
- Reusable across any data type (generic `<T>`)
- Tri-state sorting: none → asc → desc → none
- Separates business logic from UI

**Trade-offs:**
- Clean separation, testable in isolation
- Can be reused for other tables
- One extra abstraction layer but worth interms of reusability and seperation of concerns.
- Client-side only (500+ items get slow), This is not preferred for bulk data requirements. Server side sorting is preferred in that case.

**Future Improvements:**
- [ ] Server-side sorting for large datasets (1,000+ items)
- [ ] Multi-column sort (sort by category, then price)
- [ ] Remember sort preference

---

### **2. Pagination**

#### **Decision: Custom `usePagination` Hook with Dual-Mode Support**
```typescript
// Client-side (current)
const { paginatedData, currentPage, goToPage } = usePagination(data, { 
  pageSize: 10 
});

// Server-side (ready for future)
const { paginatedData } = usePagination(data, {
  pageSize: 10,
  serverSide: true,
  totalItems: serverTotal,
  onPageChange: fetchPage
});
```

**Why:**
- Client-side: Simple, works for small datasets (< 1,000 items)
- Server-side ready: Built-in support for backend pagination
- Generic implementation works with any data type

**Trade-offs:**
- Works out-of-the-box for current scale (50 items)
- Future-proof (server-side already implemented)
- Client-side loads all data upfront not suitable for bulk data requirements since this can cause UI freeze or performance issue due to high memory.
- Slow for 5,000+ items without server-side, Better to choose server side pagination for this case

**Future Improvements:**
- [ ] Migrate to server-side when dataset grows (> 1,000 items)
- [ ] Add "items per page" selector (10, 25, 50, 100)
- [ ] Add "jump to page" input
- [ ] Keyboard navigation (arrow keys)

---

### **3. Responsive Layout**

#### **Decision: Conditional Rendering Based on `useResponsive` Hook**
```typescript
const { isMobile } = useResponsive();

{isMobile ? (
  <ProductsCardView data={data} />
) : (
  <ProductsTableView data={data} />
)}
```

**Why:**
- Different UX for different devices (table vs cards)
- Single source of truth for breakpoint detection
- Better than CSS-only approach for React components

**Breakpoints:**
- Mobile: < 768px (cards)
- Desktop: ≥ 768px (table)

**Trade-offs:**
- Optimal UX per device
- Conditional rendering = smaller DOM on mobile
- Component unmounts/remounts on resize
- CSS only responsiveness is better

**Future Improvements:**
- [ ] Add tablet layout (768px - 1024px) - hybrid view
- [ ] Add smooth transition between views
- [ ] Consider CSS-only responsive table for simpler use cases

---

## 🏗️ **Major Architecture Decisions**

### **1. Atomic Design Pattern**

#### **Decision: Component Hierarchy**
```
Atoms       → Button, Badge, Icon, Skeleton
Molecules   → Header, Footer, Sidebar, Select
Organisms   → DataTable, Pagination, FilterBar, Card
Templates   → AppLayout, PageLayout
Pages       → Products, About
```

**Why:**
- Industry-standard pattern (Brad Frost)
- Clear component categorization
- Easy to locate components
- Scales well with team growth

**Trade-offs:**
- Predictable structure, easy onboarding
- Reusable components at each level
- Sometimes unclear which level (molecule vs organism?). However AI tools can help on deciding it.
- More folders to navigate but adaptabile and can be scaled to any level of UI complexity.

**Future Improvements:**
- [ ] Add Storybook for component documentation
- [ ] Create component testing strategy per level
- [ ] Document when to create new atom vs molecule

---

### **2. TypeScript in Strict Mode**

#### **Decision: Full TypeScript with `strict: true`**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

**Why:**
- Catch errors at compile time
- Better IDE autocomplete
- Self-documenting code
- Industry expectation for senior roles

**Trade-offs:**
- Zero runtime type errors
- Refactoring confidence
- Better developer experience

**Future Improvements:**
- [ ] Add runtime validation with Zod (API responses)
- [ ] Generate types from OpenAPI spec (when backend ready)
- [ ] Add stricter ESLint rules (@typescript-eslint/recommended)

---

### **3. Custom Hooks for Business Logic**

#### **Decision: Extract All Business Logic into Hooks**
```typescript
useSort      → Sorting logic
usePagination → Pagination logic
useFilter    → Filtering logic
useURLState  → URL state sync
useResponsive → Breakpoint detection
```

**Why:**
- Components focus on presentation
- Logic is testable in isolation
- Easy to reuse across pages
- Follows React best practices

**Trade-offs:**
- Clean component code
- Easy to test
- Reusable
- One more place to look for logic.

**Future Improvements:**
- [ ] Add unit tests for each hook (Vitest)
- [ ] Document hook usage patterns

---

### **4. URL State Management**

#### **Decision: Sync Filters/Sort/Page with URL**
```typescript
// URL: ?category=electronics&sort=price&dir=asc&page=2

const { value: category, setValue: setCategory } = 
  useURLState('category', 'all');
```

**Why:**
- Shareable/bookmarkable URLs
- Browser back/forward works
- No global state library needed (React Query, Redux)
- Simple for current requirements

**Trade-offs:**
- Users can bookmark filtered views
- No external dependencies
- Works with browser history
- URL can get long with many filters

**Future Improvements:**
- [ ] Add URL compression for complex filters
- [ ] Consider React Query for server state (caching, optimistic updates)
- [ ] Add URL state validation (invalid values)

---

### **5. Data Fetching Strategy**

#### **Decision: Simple Async/Await in useEffect**
```typescript
useEffect(() => {
  const loadProducts = async () => {
    setIsLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setIsLoading(false);
  };
  loadProducts();
}, []);
```

**Why:**
- Simple, no dependencies needed
- Works for current scale (50 items, static JSON)
- Easy to understand

**Trade-offs:**
- Simple, no learning curve
- No external dependencies
- No caching (refetches on remount)
- No optimistic updates
- Manual loading/error state management

**Future Improvements:**
- [ ] **MIGRATE TO REACT QUERY** (when backend ready)
  - Automatic caching
  - Request deduplication
  - Optimistic updates
  - Retry logic
  - Background refetching
- [ ] Add error handling UI
- [ ] Add retry mechanism
- [ ] Add stale-while-revalidate pattern

---

### **6. Performance Optimizations**

#### **Decision: Strategic React.memo + useMemo + useCallback**

**What We Optimized:**
```typescript
// 1. Row-level memoization (CRITICAL)
export const DataTableRow = React.memo(RowComponent, compareProps);

// 2. Expensive calculations
const filtered = useMemo(() => 
  products.filter(p => p.category === category),
  [products, category]
);

// 3. Stable references
const handleSort = useCallback((key) => {
  setSortConfig({ key, direction: 'asc' });
}, []);
```

**Why:**
- Current dataset (50 items): Works fine without optimization
- BUT: Demonstrates senior-level knowledge
- Future-proofs for larger datasets
- Minimal complexity increase

**Trade-offs:**
- 10x faster interactions with large datasets
- Shows professional optimization knowledge
- Foundation for scaling
- Need to understand memo dependencies

**What Did NOT Optimize (Intentionally):**
- ❌ Virtual scrolling (only 10 items per page) but can be added later
- ❌ Code splitting (small bundle) can be implemented later on
- ❌ React.memo on simple components but can be added when performance impact is visible otherwise it is an overkill.

**Future Improvements:**
- [ ] Add React DevTools Profiler monitoring
- [ ] Add virtual scrolling if page size increases (100+ items)
- [ ] Add lazy loading for images (when real product images added)

---

### **7. Component Composition Pattern**

#### **Decision: Generic DataTable with Column Configuration**
```typescript
// Generic, reusable table
<DataTable<Product>
  data={products}
  columns={PRODUCT_COLUMNS}
  sortConfig={sortConfig}
  onSort={handleSort}
/>

// Column configuration
const PRODUCT_COLUMNS: ColumnDef<Product>[] = [
  { key: 'name', header: 'Product Name', sortable: true },
  { key: 'price', header: 'Price', sortable: true, render: formatPrice },
];
```

**Why:**
- Reusable table for any data type
- Flexible column rendering
- Sorting built-in
- Type-safe with TypeScript generics

**Trade-offs:**
- Reusable for users, orders, etc.
- Declarative column configuration
- Type-safe

**Future Improvements:**
- [ ] Add column resizing
- [ ] Add column visibility toggle
- [ ] Add column filters (per-column filtering)

---

### **8. ErrorBoundary**

#### **Decision: Graceful error handling**

```typescript
// ErrorBoundary
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
```

**Why:**
- To catch javascript errors
- For error reporting and monitoring
- Must have since it provides an alternate UI instead of crashing the application while having JS errors
- Shows a user friendly UI

**Future Improvements:**
- [ ] Add development enviornment error display( with more details)
- [ ] Add proper logging for production errors

## 🎯 **Design Principles Applied**

### **1. SOLID Principles**
- **Single Responsibility:** Each component/hook does one thing
- **Open/Closed:** Easy to extend (add columns, filters) without modifying
- **Liskov Substitution:** All button variants work the same way
- **Interface Segregation:** Focused props interfaces
- **Dependency Inversion:** Components depend on types, not concrete implementations

### **2. DRY (Don't Repeat Yourself)**
- Sorting logic → `useSort` hook (not duplicated)
- Pagination logic → `usePagination` hook (not duplicated)
- Button styles → `Button.variants.ts` (not inline)

### **3. KISS (Keep It Simple)**
- No Redux/MobX (URL state sufficient)
- No unnecessary abstractions
- Simple async/await (no complex sagas)

### **4. YAGNI (You Aren't Gonna Need It)**
- No virtual scrolling (10 items per page)
- No multi-select (not in requirements)
- No bulk actions (not in requirements)

---

## 📊 **Scalability Decisions**

### **Current Scale:**
- 50 products
- 5 categories
- 1 user (no auth)
- Static JSON data

### **Designed to Scale To:**
- 1,000 products (with current client-side approach)
- 10,000+ products (with server-side pagination)
- Multiple users (auth-ready architecture)
- Real-time updates (hooks can integrate WebSocket)

### **Migration Path:**

**Phase 1 (Current):** Static JSON → Client-side operations
**Phase 2 :** Add backend → Server-side pagination/sorting/filtering
**Phase 3 :** Add React Query → Caching, optimistic updates
**Phase 4 :** Scale further → Add indexes, CDN, Redis cache

---

## **Summary**

### **Key Decisions:**
1. ✅ Custom hooks for reusable logic
2. ✅ TypeScript strict mode for safety
3. ✅ Atomic Design for scalability
4. ✅ URL state for shareable links
5. ✅ Strategic optimization (row-level memo)
6. ✅ Generic components (DataTable<T>)
7. ✅ Future-proof (server-side pagination ready)

### **Trade-offs Accepted:**
- Simple over complex (no Redux, no React Query yet)
- Client-side first (works for current scale)
- Strategic optimization (not over-engineered)

### **Future Improvements Priority:**
1. **Backend API + Server-side operations** (when dataset grows)
2. **React Query integration** (for caching and optimistic updates)
3. **Testing suite** (unit + integration tests)
4. **Enhanced UX** (search, advanced filters, bulk actions)
5. **Accessibility audit** (WCAG 2.1 AAA)

---

**Tools used:** AI tool is used to generate typescrpt documentation and overall refactoring of code.

**Philosophy:** Start simple, optimize strategically, scale when needed

---
