import L from 'leaflet';

const createIcon = (color: string, svg: string) => L.divIcon({
  className: 'custom-marker',
  html: `<div style="background:${color};width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 3px 6px rgba(0,0,0,0.2)">
          <div style="transform:rotate(45deg);color:white">${svg}</div>
        </div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34]
});

const plus = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';

export const MARKER_ICONS: Record<string, L.DivIcon> = {
  govt_vet: createIcon('#ef4444', plus),
  private_vet: createIcon('#3b82f6', plus),
  user: createIcon('#000', '<div class="w-2 h-2 bg-white rounded-full"></div>')
};