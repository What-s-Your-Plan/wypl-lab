import defaultImage from '@/assets/images/defaultImage.png';

function getMemberProfileImageOrDefault(memberProfileImage: string | null) {
  return memberProfileImage === null ? defaultImage : memberProfileImage;
}

export { getMemberProfileImageOrDefault };
