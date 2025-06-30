import React, { useEffect, useState } from 'react';
import S from '../style';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import Pagination from '../../../../hooks/pagenation/Pagination';

const MyTreeItemSticker = () => {
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

  const paginatedItems = memberItems.filter(item => item.itemType === "스티커").slice(
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
    const addItem = sameTypeItems.filter(item => item.itemId === itemId && item.treeCustomizingApply === 0)[0];
    addItem.treeCustomizingApply = 1;
    
    setMemberAppliedItemSticker((prev) => [...prev, addItem]);
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

  const handleRemoveClick = (itemId, itemType) => {
    const sameTypeItems = memberCustomizingList.filter((item) => item.itemType === itemType);
    const removeItem = sameTypeItems.filter(item => item.itemId === itemId && item.treeCustomizingApply === 1)[0];
    removeItem.treeCustomizingApply = 0;
    setMemberAppliedItemSticker(memberAppliedItemsSticker.filter((item) => item.treeCustomizingId !== removeItem.treeCustomizingId));
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
                }
              />
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
          totalPages={Math.ceil(memberItems.filter(item => item.itemType === "스티커").length / 24)}
          onPageChange={setCurrentPage}
        />
      </S.PaginationWrapper>
    </S.ItemCardListBox>
  );
};

export default MyTreeItemSticker;