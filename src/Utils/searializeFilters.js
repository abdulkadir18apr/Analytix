
export const serializeFilters = (filters) => {
    const params = new URLSearchParams();
  
    if (filters.startDate) {
      params.append('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params.append('endDate', filters.endDate);
    }
  
    if (filters.isMale) {
      params.append('isMale', filters.isMale.toString());
    }
    if (filters.isFeMale) {
      params.append('isFeMale', filters.isFeMale.toString());
    }
  
    
    if (filters.isAboveAge) {
      params.append('isAboveAge', filters.isAboveAge.toString());
    }
    if (filters.isUnderAge) {
      params.append('isUnderAge', filters.isUnderAge.toString());
    }
  
    return params.toString();
  };
  

 
  