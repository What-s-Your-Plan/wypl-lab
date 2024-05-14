import defaultProfileImage from '@/assets/icons/user.svg';

function getMemberProfileImageOrDefault(memberProfileImage: string | null) {
  return memberProfileImage === null || memberProfileImage === undefined
    ? defaultProfileImage
    : memberProfileImage;
}

export { getMemberProfileImageOrDefault };
