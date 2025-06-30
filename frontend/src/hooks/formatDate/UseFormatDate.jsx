const UseFormatDate = (time) => {
  const date = new Date(time);
  const offsetDate = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // +9시간(KST 보정)
  const yyyy = offsetDate.getFullYear();
  const mm = String(offsetDate.getMonth() + 1).padStart(2, '0');
  const dd = String(offsetDate.getDate()).padStart(2, '0');
  const hh = String(offsetDate.getHours()).padStart(2, '0');
  const min = String(offsetDate.getMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
};

export default UseFormatDate;