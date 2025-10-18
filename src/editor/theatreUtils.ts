// Call this after the Theatre's studio has inited (onload is good)
export async function customizeTheatreElements() {
  // Wait until it's loaded
  while (!document.getElementById('theatrejs-studio-root')) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  // Should exist
  const root = document.getElementById('theatrejs-studio-root');
  if (root === null) return;
  
  if (root.shadowRoot === null) return;
  
  const pointerRoot = root.shadowRoot.getElementById('pointer-root');
  if (pointerRoot === null) return;
  
  const theatreEl = pointerRoot.children[0];
  if (theatreEl === null) return;

  try {
    const headerEl = theatreEl.children[1] as HTMLDivElement;
    const rightBtns = headerEl.children[1] as HTMLDivElement;
    rightBtns.parentElement?.removeChild(rightBtns);
  } catch (_) {
    //
  }

  try {
    const exportEl = theatreEl.children[3] as HTMLDivElement;
    exportEl.style.top = '0';
    exportEl.style.right = '300px';
  } catch (_) {
    //
  }
}
