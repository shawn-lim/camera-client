module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-npm')(shipit);
  shipit.initConfig({
    default: {
      workspace: '/tmp/shipit-monitor',
      dirToCopy: 'dist',
      branch: 'develop',
      deployTo: '/var/www/banana-peel',
      repositoryUrl: 'git@git.istuary.com:dev-ops/banana-peel.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 2,
      shallowClone: true
    },
    integration: {
      restart: 'sudo systemctl restart banana-peel',
      servers: 'cypress@10.0.10.208'
    },
    staging: {
      branch: 'rails-stable',
      restart: 'sudo /sbin/start banana-peel || sudo /sbin/restart banana-peel',
      servers: 'shawn@dev-ops.istuary.com'
    }
  });
  shipit.task('restart', function(){
    return shipit.remote(shipit.config.restart);
  });
  shipit.on('deployed', function(){
     shipit.start('restart');
  });
  shipit.on('rollbacked', function(){
     shipit.start('restart');
  });
};
