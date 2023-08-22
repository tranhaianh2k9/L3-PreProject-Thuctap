export const getNameById = (id, listData) => {
    const teamObj = listData.find((element) => Number(element?.id) === Number(id));
    if(teamObj?.leaderName){
      return teamObj?.leaderName;
    }else{
      return teamObj?.name;
    }
  };

  export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

 export const removeMultipleSpaces = (str) => {
    return str.replace(/\s{2,}/g, ' ');
  };