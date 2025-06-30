import React, { useEffect, useState } from 'react';
import S from '../style';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import Pagination from '../../../../hooks/pagenation/Pagination';

const MyTreeItemsAll = () => {
  const {
    memberId,
    memberItems,
    setMemberItems,
    memberAppliedItemsSticker,
    setMemberAppliedItemSticker, 
    memberAppliedItemBackground,
    setMemberAppliedItemBackground, 
    memberAppliedItemTree,
    setMemberAppliedItemTree,
    memberCustomizingList, 
    setMemberCustomizingList
  } = useOutletContext();
  
  const [selectedItemCard, setSelectedItemCard] = useState(-1);
  // 아이템 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = memberItems.slice(
    (currentPage - 1) * 24,
    currentPage * 24
  );
    
  

  const handleClickItemCard = (index) => {
    if(selectedItemCard != index){
      setSelectedItemCard(index);
    } else{
      setSelectedItemCard(-1);
    }
  }
  
  const handleAddClick = (itemId, itemType) => {
    const sameTypeItems = memberCustomizingList.filter((item) => item.itemType === itemType);
    if(itemType === "배경"){
      const removeItem = sameTypeItems.filter((item) => item.itemType === itemType && item.treeCustomizingApply === 1)[0];
      const addItem =  sameTypeItems.filter((item) => item.itemId === itemId)[0];
      
      if(removeItem) {
        removeItem.treeCustomizingApply = 0;
      }

      addItem.treeCustomizingApply = 1;
      setMemberAppliedItemBackground(addItem);
      setMemberCustomizingList(prev =>
        prev.map(item =>
          item.itemId === addItem.itemId
          ? { ...item, treeCustomizingApply: 1 }
          :
          removeItem && item.treeCustomizingId === removeItem.treeCustomizingId
          ? { ...item, treeCustomizingApply: 0 }
          : item
      ));
      setMemberItems(prev =>
        prev.map(item =>
          item.itemId === addItem.itemId
            ? {
                ...item,
                notAppliedCount: item.notAppliedCount - 1,
                appliedCount: item.appliedCount + 1
              }
            : 
          removeItem && item.itemId === removeItem.itemId
            ? {
              ...item,
              notAppliedCount: item.notAppliedCount + 1,
              appliedCount: item.appliedCount - 1
            }
            :
            item
        )
      );
    } else if(itemType === "나무"){
      const removeItem = sameTypeItems.filter((item) => item.itemType === itemType && item.treeCustomizingApply === 1)[0];
      const addItem =  sameTypeItems.filter((item) => item.itemId === itemId)[0];
      addItem.treeCustomizingApply = 1;
      
      if(removeItem) {
        removeItem.treeCustomizingApply = 0;
      }

      setMemberAppliedItemTree(addItem);
      setMemberCustomizingList(prev =>
        prev.map(item =>
          item.itemId === addItem.itemId
          ? { ...item, treeCustomizingApply: 1 }
          :
          removeItem && item.treeCustomizingId === removeItem.treeCustomizingId
          ? { ...item, treeCustomizingApply: 0 }
          : item
      ));
      setMemberItems(prev =>
        prev.map(item =>
          item.itemId === addItem.itemId
            ? {
                ...item,
                notAppliedCount: item.notAppliedCount - 1,
                appliedCount: item.appliedCount + 1
              }
            : 
          removeItem && item.itemId === removeItem.itemId
            ? {
              ...item,
              notAppliedCount: item.notAppliedCount + 1,
              appliedCount: item.appliedCount - 1
            }
            :
            item
        )
      );
    } else {
      const addItem = sameTypeItems.filter(item => item.itemId === itemId && item.treeCustomizingApply === 0)[0];
      addItem.treeCustomizingApply = 1;
      
      setMemberAppliedItemSticker((prev) => [...prev, addItem]);
      setMemberCustomizingList(prev =>
        prev.map(item =>
          item.treeCustomizingId === addItem.treeCustomizingId
            ? { ...item, treeCustomizingApply: 1 }
            : item
      ));

      setMemberItems(prev =>
        prev.map(item =>
          item.itemId === addItem.itemId
            ? {
                ...item,
                notAppliedCount: item.notAppliedCount - 1,
                appliedCount: item.appliedCount + 1
              }
            : item
        )
      );
    }
  }

  const handleRemoveClick = (itemId, itemType) => {
    const sameTypeItems = memberCustomizingList.filter((item) => item.itemType === itemType);

    if(itemType === "배경"){
      const removeItem = sameTypeItems.filter(item => item.itemId === itemId && item.treeCustomizingApply === 1)[0];
      removeItem.treeCustomizingApply = 0;
      setMemberAppliedItemBackground(null);
      setMemberItems(prev =>
        prev.map(item =>
          item.itemId === removeItem.itemId
            ? {
                ...item,
                notAppliedCount: item.notAppliedCount + 1,
                appliedCount: item.appliedCount - 1
              }
            : item
        )
      );
    } else if(itemType === "나무"){
      const removeItem = sameTypeItems.filter(item => item.itemId === itemId && item.treeCustomizingApply === 1)[0];
      removeItem.treeCustomizingApply = 0;
      setMemberAppliedItemTree(null);
      setMemberItems(prev =>
        prev.map(item =>
          item.itemId === removeItem.itemId
            ? {
                ...item,
                notAppliedCount: item.notAppliedCount + 1,
                appliedCount: item.appliedCount - 1
              }
            : item
        )
      );
    } else{
      const removeItem = sameTypeItems.filter(item => item.itemId === itemId && item.treeCustomizingApply === 1)[0];
      setMemberAppliedItemSticker(memberAppliedItemsSticker.filter((item) => item.treeCustomizingId !== removeItem.treeCustomizingId));
      setMemberCustomizingList(prev =>
        prev.map(item =>
          item.treeCustomizingId === removeItem.treeCustomizingId
            ? { ...item, treeCustomizingApply: 0 }
            : item
      ));

      setMemberItems(prev =>
        prev.map(item =>
          item.itemId === removeItem.itemId
            ? {
                ...item,
                notAppliedCount: item.notAppliedCount + 1,
                appliedCount: item.appliedCount - 1
              }
            : item
        )
      );
    }
  }

  return (
    <S.ItemCardListBox>
      {
        paginatedItems && paginatedItems.map((item) => (
          <S.ItemCard 
            key={item.itemId} 
            onClick={() => {handleClickItemCard(item.itemId)}}
            selected={item.itemId === selectedItemCard}
            appliedCount={item.appliedCount}
            notAppliedCount={item.notAppliedCount}
          >
            <S.ItemCardImg 
              url={
                item.itemImgPath && item.itemImgName
                  ? 
                  `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${item.itemImgPath}&fileName=${item.itemImgName}`
                  : 
                  ""
              }/>
            <S.ItemTitle>{item.itemName}</S.ItemTitle>
            {
                item.itemType === "스티커" && (
                <>
                  <S.ItemAmount>남은 개수 : {item.notAppliedCount}</S.ItemAmount>
                  <S.ItemDescriptionH10>사이즈 ({item.itemSizeWidth} X {item.itemSizeHeight})</S.ItemDescriptionH10>
                </>
              )
            }
            
            {
              item.itemId === selectedItemCard && (
                <>
                  <S.ButtonWrapper>
                    {
                      item.notAppliedCount !== 0 && (
                        <S.ItemAddButton onClick={() => handleAddClick(item.itemId, item.itemType)}>추가</S.ItemAddButton>
                      )
                    }
                    {
                      item.totalCount != item.notAppliedCount && (
                        <S.ItemRemoveButton onClick={() => handleRemoveClick(item.itemId, item.itemType)}>제거</S.ItemRemoveButton>
                      )
                    }
                  </S.ButtonWrapper>
                </>
              )
            }
          </S.ItemCard>
        ))
      }
      <S.PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(memberItems.length / 24)}
          onPageChange={setCurrentPage}
        />
      </S.PaginationWrapper>
    </S.ItemCardListBox>
  );
};

export default MyTreeItemsAll;