using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Setting.model;

namespace Setting.api
{
    /// <summary>
    /// Summary description for getConfig
    /// </summary>
    public class getConfig : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            Dictionary<string, object> ilink = new Dictionary<string, object>();
            Dictionary<string, object> wifi = new Dictionary<string, object>();
            Dictionary<string, object> camera = new Dictionary<string, object>();

            ilink.Add("uid", "Fc5wGsTuvuiuFaFaMRo9885PeDCafvkqJ7");
            ilink.Add("appkey", "d9dcd300-885f-647164");
            ilink.Add("securtkey", "e884a15c40df2c6959a52617c18115a2");
            ilink.Add("server", "www.kfchain.com");
            ilink.Add("port", 8085);

            data.Add("ilink", ilink);
            data.Add("wifi", wifi);
            wifi.Add("mode", "APSTA");
            wifi.Add("ssid", "kaifakuai_fac_ap_1");
            wifi.Add("passwd", "kaifakuai@beidou.com123");

            camera.Add("number", 1);
            camera.Add("name", "车头");
            camera.Add("rec_cycle", 5);
            camera.Add("rec_in_addr", "rtsp://admin:cs123456@192.168.199.64/h264/ch1/sub/av_stream");
            camera.Add("rec_out_addr", "/media/mmcblk0p1");
            camera.Add("play_in_addr", "rtsp://admin:cs123456@192.168.199.64/h264/ch1/sub/av_stream");
            camera.Add("play_out_addr", "/tmp");
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            list.Add(camera);
            List<camera> list2 = new List<camera>();
            list2.Add(new camera(1)); 
            list2.Add(new camera(2,"车尾"));
            //list2.Add(new camera(3,"左边"));
            data.Add("cameras", list2);

            context.Response.ContentType = "application/json";
            string postData = Newtonsoft.Json.JsonConvert.SerializeObject(data);
            string uid =""+ context.Request.Params["uid"];
            Console.WriteLine(uid);
             byte[] datarecv=context.Request.BinaryRead(context.Request.TotalBytes);
             string str = System.Text.Encoding.UTF8.GetString(datarecv);
             Console.WriteLine(str);
            context.Response.Write(postData);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}