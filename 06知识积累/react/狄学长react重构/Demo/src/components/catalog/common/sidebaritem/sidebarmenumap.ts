const requireContext = require['context']("./img", true, /^\.\/.*\.svg$/);
const projectImgs = requireContext.keys().map(requireContext);
const SidebarMenuImgMap = {};
let imgNames = requireContext.keys();
imgNames.forEach((item, index) => {
    SidebarMenuImgMap[item] = projectImgs[index];
});

export default SidebarMenuImgMap;