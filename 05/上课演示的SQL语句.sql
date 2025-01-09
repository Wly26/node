-- 通过 * 把 my_db_01.users 表中所有的数据查询出来
-- select * from my_db_01.users

-- 从 my_db_01.users 表中把 username 和 password 对应的数据查询出来
-- select username, password from my_db_01.users

-- 向 my_db_01.users 表中，插入新数据，username 的值为 tony stark  password 的值为 098123
-- insert into my_db_01.users (username, password) values ('tony stark', '098123')
-- select * from my_db_01.users

-- 将 id 为 4 的用户密码，更新成 888888
-- update my_db_01.users set password='888888' where id=4
-- select * from my_db_01.users

-- 更新 id 为 2 的用户，把用户密码更新为 admin123  同时，把用户的状态更新为 1
-- update my_db_01.users set password='admin123', status=1 where id=2
-- select * from my_db_01.users

-- 删除 my_db_01.users 表中， id 为 4 的用户
-- delete from my_db_01.users where id=4
-- select * from my_db_01.users

-- 演示 where 子句的使用
-- select * from my_db_01.users where status=1
-- select * from my_db_01.users where id>=2
-- select * from my_db_01.users where username<>'ls'
-- select * from my_db_01.users where username!='ls'

-- 使用 AND 来显示所有状态为0且id小于3的用户
-- select * from my_db_01.users where status=0 and id<3

-- 使用 or 来显示所有状态为1 或 username 为 zs 的用户
-- select * from my_db_01.users where status=1 or username='zs'

-- 对users表中的数据，按照 status 字段进行升序排序
-- select * from my_db_01.users order by status

-- 按照 id 对结果进行降序的排序  desc 表示降序排序   asc 表示升序排序（默认情况下，就是升序排序的）
-- select * from my_db_01.users order by id desc

-- 对 my_db_01.users 表中的数据，先按照 status 进行降序排序，再按照 username 字母的顺序，进行升序的排序
-- select * from my_db_01.users order by status desc, username asc

-- 使用 count(*) 来统计 my_db_01.users 表中，状态为 0 用户的总数量
-- select count(*) from my_db_01.users where status=0

-- 使用 AS 关键字给列起别名
-- select count(*) as total from my_db_01.users where status=0
-- select username as uname, password as upwd from my_db_01.users