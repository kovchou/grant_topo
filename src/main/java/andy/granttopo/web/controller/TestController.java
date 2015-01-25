package andy.granttopo.web.controller;

import andy.granttopo.model.User.User;
import andy.granttopo.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by andy on 12/26/14.
 */
@Controller
@RequestMapping("/test")
public class TestController {
    @Autowired
    private TestService testService;

    @RequestMapping(value = "/a.html",method = RequestMethod.GET)
    public ModelAndView test(@RequestParam("name")String name) {
        User user = new User(name);
        testService.test(user);

        ModelAndView modelAndView = new ModelAndView("/a");
        modelAndView.addObject("user", user);
        return modelAndView;
    }
}
