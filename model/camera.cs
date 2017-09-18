using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Setting.model
{
    public class camera
    {
       public int number;
       public string name;
       public int rec_cycle;
       public string rec_in_addr;
       public string rec_out_addr;
       public string play_in_addr;
       public string play_out_addr;
       public camera(int i, string name = "车头")
       { 
            number=i;
            this.name = name + i;
            rec_cycle=5;
            rec_in_addr="rtsp://admin:cs123456@192.168.199.64/h264/ch1/sub/av_stream";
            rec_out_addr="/media/mmcblk0p1";
            play_in_addr="rtsp://admin:cs123456@192.168.199.64/h264/ch1/sub/av_stream";
            play_out_addr="/tmp";
       }
    }
}