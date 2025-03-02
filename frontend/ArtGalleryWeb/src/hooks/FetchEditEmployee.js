export const fetchEmployeeById = async (id) => {
    try {
        console.log("Fetching Employee with ID:", id)
      const response = await fetch(`http://localhost:4000/api/admin/${id}`);
      if (!response.ok) {
        throw new Error(`Employee not found: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  };
  export const updateEmployee = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update employee: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  };
  export const deleteEmployee = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/api/admin/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete employee");
        }

        return { success: true };
    } catch (error) {
        throw error;
    }
};
  
