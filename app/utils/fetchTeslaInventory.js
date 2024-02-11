
export async function fetchTeslaInventory() {
    try {
      const response = await fetch('https://api.tesla.com/v1/inventory');
      if (!response.ok) {
        throw new Error('Failed to fetch Tesla inventory data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Tesla inventory data:', error);
      return null;
    }
  }
  