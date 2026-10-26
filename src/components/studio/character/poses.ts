export const poses = {
 cover: {x:945,y:315,scale:1.12,lean:0,head:-2,left:[18,-18,0],right:[-18,18,0],expression:'confident',camera:0,open:0},
 regard: {x:1090,y:295,scale:.88,lean:-3,head:-6,left:[60,-40,0],right:[-60,40,0],expression:'sly',camera:1,open:0},
 direction: {x:660,y:300,scale:.94,lean:-3,head:3,left:[18,-18,0],right:[-55,185,50],expression:'smile',camera:0,open:1},
 fabrique: {x:1050,y:275,scale:.88,lean:8,head:8,left:[114.3,-176.2,53.9],right:[55,-55,0],expression:'sly',camera:0,open:0},
} as const;
export type Pose = keyof typeof poses;
export const mobilePoses = {
 cover:{x:280,y:365,scale:1.3}, regard:{x:390,y:340,scale:1.05},
 direction:{x:250,y:370,scale:1.04}, fabrique:{x:520,y:340,scale:.95},
} as const;
