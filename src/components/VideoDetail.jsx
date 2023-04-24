import React from 'react';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, } from '@mui/material';
import ReactPlayer from 'react-player';
import { Typography,Box,Stack } from '@mui/material/';
import {Videos} from "./";
import { fetchFromAPI } from '../utils/FetchFromApi';

import { CheckCircle } from '@mui/icons-material';

const VideoDetail = () => {
    const[VideoDetail,setVideoDetail] = useState(null);
    const [videos, setVideos] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

      fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))

    }, [id]);
    if(!VideoDetail?.snippet) return 'Loading......!'
    
    const { snippet:{title,channelId,channelTitle},statistics:{viewCount,likeCount}} = VideoDetail;


  return (
    <Box minHeight='95vh'>
        <Stack direction={{xs:'column',md:'row'}} spacing={2} p={2} >
            <Box flex={1}>
                <Box sx={{width:'100%',position:'sticky',top:'86px'}}>
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
                    className='react-player' controls
                    />
                    <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                       {title} 
                    </Typography>
                    <Stack direction='row' justifyContent="space-between" sx={{color:"#fff"}} py={1} px={2}>
                        <Link to={`/channel/${channelId}`}>
                            <Typography variant={{sm:'subtitle',md:'h6'}}
                            color="#fff">
                                {channelTitle}
                                <CheckCircle sx={{fontSize:'12px',ml:'5px',color:'gray'}}/>
                            </Typography>
                        </Link>
                        <Stack direction='row' gap="20px" alignItems="center">
                            <Typography variant="body1" sx={{opacity:0.7}}>{parseInt(viewCount).toLocaleString()} views</Typography>
                            <Typography variant="body1" sx={{opacity:0.7}}>{parseInt(likeCount).toLocaleString()} likes</Typography>
                        </Stack>

                    </Stack>
                </Box>

            </Box>
            <Box px={2} py={{md:1,xs:5}} justifyContent="center">
            <Videos videos={videos} direction='column'/>

        </Box>

        </Stack>
        

    </Box>
  )
}

export default VideoDetail