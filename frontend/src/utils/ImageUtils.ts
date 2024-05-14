import defaultImage from '@/assets/images/defaultImage.png';

function getMemberProfileImageOrDefault(memberProfileImage: string | null) {
  return memberProfileImage === null || memberProfileImage === undefined
    ? defaultImage
    : memberProfileImage;
}

export { getMemberProfileImageOrDefault };
